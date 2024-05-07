"use server";
import { createResponse } from "@/lib/fuctions";
import OpenAI from 'openai'
import axios from "axios";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

type GPTResponse = {
    data: Array<{
        title: string;
        excerpt: string;
    }>,
    summary: string;
};

type NotFountResponse = {
    batchcomplete: string;
    query: {
        pages: {
            '-1':
            { 
                ns: number;
                title: string;
                missing: string;
            }
        }
    }
}

export type SemanticSearchActionActionResponse = { 
    data: Array<{
        title: string;
        excerpt: string;
    }>,
    sumary: string;
}

export const SemanticSearchAction = async (prevData: any, formData: FormData) => {

    const userSearch = formData.get('search') as string;

    if (!userSearch) {
        return createResponse('error', 'Please provide a search query');
    }

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `You are a wikipedia search bot, you will be given a search query and you will return article title that fits the search query. in a JSON format follow this typescript type: 
                === type ===
                type response = {
                    data: Array<{
                        title: string;
                        excerpt: string;
                    }>,
                    sumaary: string;
                }
                === End of Response ===
                The response should follow the typescript type, give at least 5 articles in the json response, the search query is: ${userSearch}`,
                name: 'system',
            },
        ],
        temperature: 1,
        max_tokens: 1024,
        response_format: { type: "json_object" },
    });

    const GPTResponse = JSON.parse(response?.choices[0]?.message?.content) as GPTResponse;

    // for each of the obj title, call the wikipedia api to get the article, then return the title and the excerpt
    const endData = GPTResponse.data.map(async (obj) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${obj.title}`;
        const response = await axios.get(url);

        //check if the article is not found
        if (response.data.query.pages['-1']) {
            return null
        }
        const page = response.data.query.pages[Object.keys(response.data.query.pages)[0]];
        obj.excerpt = page.extract;

        return obj;
    });

    const final = (await Promise.all(endData)).filter((obj) => obj !== null) as Array<{
        title: string;
        excerpt: string;
    }>;

    return createResponse('success', 'Search completed successfully', { 
        data: final,
        sumary: GPTResponse.summary
    });

}
"use server";
import { createResponse } from "@/lib/fuctions";
import OpenAI from 'openai'
import axios from "axios";
import { WikipediaSearchResponse } from "@/components/home/SearchArticles";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

type GPTResponse = {
    data: Array<{
        title: string;
        excerpt: string;
    }>,
    summary: string;
};

export type SemanticSearchActionActionResponse = {
    data: ({
        response: WikipediaSearchResponse['query']
        title: string;
    } | null)[];
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

    const GPTResponse = JSON.parse(response.choices[0].message.content) as GPTResponse;

    // for each of the obj title, call the wikipedia api to get some articles about the title
    const articles = GPTResponse.data.map(async (obj) => {
        const url = `https://en.wikipedia.org/w/api.php`;
        const params = new URLSearchParams({
            action: "query",
            srsearch: obj.title,
            format: "json",
            origin: "*",
            list: "search",
        });
        const response = await axios.get<WikipediaSearchResponse>(`${url}?${params}`)

        console.log(response.data)

        //check if the article is not found
        if (response.data.query.search.length === 0) {
            return null
        }

        // return all the articles
        return {
            response: response.data.query,
            title: obj.title,
        }
    })

    const articlesData = (await Promise.all(articles)).filter(Boolean)

    const end = {
        data: articlesData,
        sumary: GPTResponse.summary
    }

    console.log(end)
    return createResponse('success','articles found', end)


}

// {
//     data: [
//       {
//         title: 'Economy of China',
//         excerpt: 
//           'The Economy of China is a mixed socialist market economy which is composed of state-owned enterprises (SOEs) and domestic and foreign private businesses and uses economic planning.'
//       },
//       {
//         title: 'Culture of China',
//         excerpt: 
//           'The culture of China is one of the world\'s oldest and most complex cultures, spanning thousands of years with a rich history of art, philosophy, music, and more.'
//       },
//       {
//         title: 'History of China',
//         excerpt: 
//           'The history of China encompasses thousands of years of political, economic, and cultural development. It is one of the world\'s oldest civilizations.'
//       },
//       {
//         title: 'Great Wall of China',
//         excerpt: 
//           'The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, built along the historical northern borders of China.'
//       },
//       {
//         title: 'Chinese cuisine',
//         excerpt: 
//           'Chinese cuisine is an important part of Chinese culture, which includes various styles of cooking that have been passed down through generations.'
//       }
//     ],
//     summary: 
//       'Here are some interesting articles about China including its economy, culture, history, Great Wall, and cuisine.'
//   }
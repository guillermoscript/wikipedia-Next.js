"use server";

import { createResponse } from "@/lib/fuctions";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";

export async function checkTestCookie({
    code,
}: {
    code: string;
}) {
    const cookieStore = cookies()
    const hasCookie = cookieStore.has('wiki_access_token')
    if (hasCookie === false) {
        try {
            
            const clientId = process.env.WIKI_CLIENT_ID
            const clientSecret = process.env.WIKI_CLIENT_SECRET
            console.log(clientId)
            console.log(clientSecret)
            console.log(code)

            const fetchAccessToken = await axios.post('https://meta.wikimedia.org/w/rest.php/oauth2/access_token', {
                grant_type: 'authorization_code',
                code,
                client_id: clientId,
                client_secret: clientSecret,
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            console.log(fetchAccessToken.data)
            cookies().set({
                name: 'wiki_access_token',
                value: fetchAccessToken.data.access_token,
                httpOnly: true,
                path: '/',
                expires: new Date(Date.now() + fetchAccessToken.data.expires_in * 1000)
            })
            cookies().set({
                name: 'wiki_refresh_token',
                value: fetchAccessToken.data.refresh_token,
                httpOnly: true,
                path: '/',
                expires: new Date(Date.now() + fetchAccessToken.data.expires_in * 1000)
            })
            return createResponse('success', 'Cookie set')
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error)
                console.log(error.response?.data)
            }
            return createResponse('error', 'Error setting cookie')
        }
    }

    return createResponse('error', 'Cookie already set')
}
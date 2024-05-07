import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    try {
        
        const user = await supabase.auth.getUser()

        if (request.nextUrl.pathname.startsWith('/calback') && user.data) {
            // get query params
            const { searchParams } = new URL(request.url)
            return NextResponse.redirect(new URL(`/dashboard?${searchParams}`, request.url))
        }


    
        if (
            (request.nextUrl.pathname.startsWith('/auth/login') && user.data.user)
            || (request.nextUrl.pathname.startsWith('/auth/signup') && user.data.user)
            || (request.nextUrl.pathname.startsWith('/auth/forgot-password') && user.data.user)
        ) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    
        if (request.nextUrl.pathname.startsWith('/dashboard') && user.error) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    
    
        if (request.nextUrl.pathname.startsWith('/w/index.php')) {
            redirectToWikipedia(request.nextUrl.href);
        }
    
        return response
    } catch (error) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

function redirectToWikipedia(url: string) {
    const regex = /\/w\/index\.php\?title=(.+)&action=(.+)&section=(.+)/;
    const match = url.match(regex);

    if (match) {
        const [title, action, section] = match;
        const wikipediaUrl = `https://en.wikipedia.org/w/?title=${title}&action=${action}&section=${section}`;
        console.log(wikipediaUrl)
        return NextResponse.redirect(wikipediaUrl)
    } 
}
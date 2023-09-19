import { NextResponse } from "next/server"

const allowedOrigins = ['http://localhost:3000', 'https://www.google.com']


export function middleware(request: Request) {

    const origin = request.headers.get('origin')

    if (origin && !allowedOrigins.includes(origin)) {
     
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    const requestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  
    if ( origin && allowedOrigins.includes(origin) ) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', "true")
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    }
  
    return response
  }

export const config = {
    matcher: '/api/:path*',
}
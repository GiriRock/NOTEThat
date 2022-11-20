import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const { cookies } = req;
    const jwt = cookies.get('OursiteJWT')?.value
    if(req.url.includes('/auth')){
        if (jwt) {
            return NextResponse.rewrite(new URL('/notes', req.url))
        }
        return NextResponse.next()
    }
    if (jwt) {
        NextResponse.next()
    } else {
        return NextResponse.rewrite(new URL('/auth/login', req.url))
    }
    
}
export const config = {
    matcher: ['/notes/:path*' , '/auth/:path*' ],
}
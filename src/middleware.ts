import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const { cookies } = req;
    // console.log(req)
    const jwt = cookies.get('OursiteJWT')?.value
    if (jwt) {
        // console.log(req.url)
        if (req.url.includes('/login')) {
            return NextResponse.rewrite(new URL('/notes', req.url))
        }
        NextResponse.next()
    } else {
        return NextResponse.rewrite(new URL('/auth/login', req.url))
        // NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
    }
}
export const config = {
    matcher: ['/notes/:path*' , '/auth/:path*' ],
}
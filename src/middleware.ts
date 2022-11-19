import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": "giridharanrock@gmail.com",
            "password": "password"
        })
    })
    const data = await response.json()
    const token = data.message
    NextResponse.next()
}

export const config = {
    matcher: '/',
}
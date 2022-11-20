import { NextRequest } from "next/server";

type Note = {
    title : string,
    body: string
}
type Notes = {
    Notes : Note[]
}
type AuthCookie = {
    [key:string] : string | undefined
}

export default async function getNotes<Notes> (cookie: AuthCookie) {
    const jwt = cookie.OursiteJWT
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/getNotes`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    })
    const data = await response.json()
    return data
}
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";


type Res = {
    message : string
}

const login = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
    if(req.method == 'POST'){
        const resp : Res = { 
            message : 'logged out'
        }
        const serialised = serialize("OursiteJWT", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
            expires: new Date
          });
          res.setHeader("Set-Cookie", serialised);
        res.status(200).json(resp)
    }else{
        res.status(405).json({message : `${req.method} not allowed`})
    }
};

export default login;


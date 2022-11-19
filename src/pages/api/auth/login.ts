import { NextApiRequest, NextApiResponse } from "next";
import { Secret, sign } from "jsonwebtoken";
const bcrypt = require('bcrypt')
import { prisma } from "../../../server/db/client";
import { serialize } from "cookie";


type Res = {
    message : string
}

const secret : Secret = `process.env.TOKEN_SECRET`
const login = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
    const error : Res = {message : "invalid username or password"}
    if(req.method == 'POST'){
        const userObj = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (!userObj) return res.status(401).json(error)
    
        const validation = await bcrypt.compare(req.body.password, userObj.password)
        if (!validation) return res.status(401).json(error)
        const token = sign({ _id: userObj.id, name: userObj.name, exp:Math.floor(Date.now() / 1000) +  60 * 60 * 24 * 30 }, secret)
        const resp : Res = { 
            message : token
        }
        const serialised = serialize("OursiteJWT", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 30,
            path: "/",
          });
          console.log(process.env.NODE_ENV);
          
          res.setHeader("Set-Cookie", serialised);
        res.status(200).json(resp)
    }else{
        res.status(405).json({message : `${req.method} not allowed`})
    }
};

export default login;


import { NextApiRequest, NextApiResponse } from "next";
import decodeJWT from "../../../middlewares/decodeJWT";
import { prisma } from "../../../server/db/client";

type User = {
    _id: string,
    name: string,
    iat: number
}

const postNote = async (req: NextApiRequest, res: NextApiResponse, userObj: User) => {
    if(req.method == 'POST'){
        if(userObj){
            try{
                const note = await prisma.note.create({
                    data:{
                        title: req.body.title,
                        body: req.body.body,
                        authorId: userObj._id
                    }
                })
                res.status(200).send(note.id)
            }catch(err){
                console.log(err)
                res.status(500).send(err)
            }
        }
    }
    res.status(405).send(`${req.method} not allowed`)
};

export default decodeJWT(postNote);

import { NextApiRequest, NextApiResponse } from "next";
import decodeJWT from "../../../middlewares/decodeJWT";
import { prisma } from "../../../server/db/client";
import { date } from "zod";

type User = {
    _id: string,
    name: string,
    iat: number
}

type Res = {
    id : string
}

const postNote = async (req: NextApiRequest, res: NextApiResponse<Res>, userObj: User) => {
    if(req.method == 'POST'){
        if(userObj){
            try{
                const date: Date = new Date();
                const note = await prisma.note.create({
                    data:{
                        title: req.body.title,
                        body: req.body.body,
                        authorId: userObj._id,
                        createDate: date,
                        lastModified: date
                    }
                })
               return res.status(200).json({id: note.id})
            }catch(err){
                console.log(err)
               return res.status(500).send({id: 'error'})
            }
        }
    }
    res.status(405).send({id: `${req.method} not allowed`})
};

export default decodeJWT(postNote);

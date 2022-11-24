import { NextApiRequest, NextApiResponse } from "next";
import decodeJWT from "../../../middlewares/decodeJWT";
import { prisma } from "../../../server/db/client";

type User = {
    _id: string,
    name: string,
    iat: number
}

const updateNote = async (req: NextApiRequest, res: NextApiResponse, userObj: User) => {
    if(req.method == 'POST'){
        if(userObj){
            try{
                const note = await prisma.note.findUnique({
                    where:{
                        "id" : req.body._id
                    }
                })
               if(note){
                const updatedNote = await prisma.note.update({
                    data: {
                        "title": req.body.title,
                        "body": req.body.body
                    },
                    where: {
                        id: note.id
                    }
                })
                return res.status(200).send(note.id)
            }
               return res.send('null')
            }catch(err){
                console.log(err)
                return res.status(500).send(err)
            }
        }
    }
    res.status(405).send(`${req.method} not allowed`)
};

export default decodeJWT(updateNote);

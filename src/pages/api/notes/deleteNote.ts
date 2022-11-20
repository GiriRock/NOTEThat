import { NextApiRequest, NextApiResponse } from "next";
import decodeJWT from "../../../middlewares/decodeJWT";
import { prisma } from "../../../server/db/client";

type User = {
    _id: string,
    name: string,
    iat: number
}

const deleteNote = async (req: NextApiRequest, res: NextApiResponse, userObj: User) => {
    if(req.method == 'POST'){
        if(userObj){
            try{
                const note = await prisma.note.delete({
                    where:{
                        "id" : req.body._id
                    }
                })
                return res.status(200).send(note)
            }catch(err){
                console.log(err)
                return res.status(500).send(err)
            }
        }
    }
    res.status(405).send(`${req.method} not allowed`)
};

export default decodeJWT(deleteNote);

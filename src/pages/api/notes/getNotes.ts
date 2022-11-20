import { NextApiRequest, NextApiResponse } from "next";
import decodeJWT from "../../../middlewares/decodeJWT";
import { prisma } from "../../../server/db/client";

type User = {
    _id: string,
    name: string,
    iat: number
}

type Note = {
    title : string,
  body: string
}

type Notes = {
   Notes : Note[]
}

const getNotes= async <Notes>  (req: NextApiRequest, res: NextApiResponse, userObj: User) => {
    if (req.method == 'GET') {
        if (userObj) {
            try {
                const response = await prisma.note.findMany({
                    where: {
                        authorId: userObj._id
                    }
                })
                return res.json({
                    Notes : response
                })
            } catch (err) {
                console.log(err)
                return res.status(500).send(err)
            }
        }
    }
    res.status(405).send(`${req.method} not allowed`)
};

export default decodeJWT(getNotes);
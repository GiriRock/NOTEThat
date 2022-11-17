import { NextApiRequest, NextApiResponse } from "next";
import decodeJWT from "../../../middlewares/decodeJWT";
import { prisma } from "../../../server/db/client";

type User = {
    _id: string,
    name: string,
    iat: number
}

const getNotes = async (req: NextApiRequest, res: NextApiResponse, userObj: User) => {
    if (req.method == 'GET') {
        if (userObj) {
            try {
                const notes = await prisma.note.findMany({
                    where: {
                        authorId: userObj._id
                    }
                })
                return res.json({ 'notes': notes })
            } catch (err) {
                console.log(err)
                return res.status(500).send(err)
            }
        }
    }
    res.status(405).send(`${req.method} not allowed`)
};

export default decodeJWT(getNotes);
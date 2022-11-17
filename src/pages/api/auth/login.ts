import { type NextApiRequest, type NextApiResponse } from "next";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

import { prisma } from "../../../server/db/client";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == 'POST'){
        const userObj = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (!userObj) return res.send("invalid username or password")
    
        const validation = await bcrypt.compare(req.body.password, userObj.password)
        if (!validation) return res.send("invalid username or password")
    
        const token = jwt.sign({ _id: userObj.id, name: userObj.name }, process.env.TOKEN_SECRET)
        res.json({'token':token})
    }
    res.status(405).send(`${req.method} not allowed`)
};

export default login;


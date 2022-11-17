import { type NextApiRequest, type NextApiResponse } from "next";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

import { prisma } from "../../../server/db/client";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == 'POST'){
        try {
            const emailExist = await prisma.user.findUnique({
                where: { email: req.body.email }
            })
            if (emailExist) return res.status(200).send('Email already exists')
        } catch (error) {
            res.status(400).send('invalid request')
            return
        }
    
        const salt = await bcrypt.genSalt(10)
        const HashedPassword = await bcrypt.hash(req.body.password, salt)
    
        try {
            const user = await prisma.user.create({
                data: {
                    email: req.body.email,
                    name: req.body.name,
                    password: HashedPassword,
                },
            })
            res.send(user.id)
        } catch (err) {
            res.status(400).send(err)
        }
    }
    res.status(405).send(`${req.method} not allowed`)
}

export default register;


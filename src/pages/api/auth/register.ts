import { type NextApiRequest, type NextApiResponse } from "next";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

type Message = {
    message : string
}

import { prisma } from "../../../server/db/client";

const register = async (req: NextApiRequest, res: NextApiResponse<Message>) => {
    const emailId = req.body.email.toLowerCase()
    if(req.method == 'POST'){
        try {
            const emailExist = await prisma.user.findUnique({
                where: { email: emailId }
            })
            if (emailExist) return res.status(400).json({message : 'Email already exists'})
        } catch (error) {
            res.status(400).json({message: 'invalid request'})
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
            res.status(200).json({message: user.id})
        } catch (err) {
            res.status(400).json({message: 'error'})
        }
    }
    res.status(405).json({message: `${req.method} not allowed`})
}

export default register;


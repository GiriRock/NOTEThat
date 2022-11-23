import { NextApiRequest, NextApiResponse } from "next"
const jwt = require('jsonwebtoken')

const decodeJWT = (handler: (arg0: NextApiRequest, arg1: NextApiResponse<any>, arg2: any) => void) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
       const token = req.headers.authorization?.split(' ')[1]?.trim()
        if (!token) res.status(401).send('Access Denied')
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            console.log(verified)
            return handler(req, res, verified)
        } catch (error) {
            console.log(error)
            return res.status(401).send('Invalid Token')
        }
    }
}

export default decodeJWT
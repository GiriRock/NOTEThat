import { NextApiRequest, NextApiResponse } from "next";
const CryptoJS = require('crypto-js')


const resetPassword = async (req: NextApiRequest, res: NextApiResponse)=>{
    res.status(200).json({
        'email': CryptoJS.enc.Base64.parse(req.query['q']).toString(CryptoJS.enc.Utf8),
        'expiry': CryptoJS.enc.Base64.parse(req.query['t']).toString(CryptoJS.enc.Utf8)
    })
}

export default resetPassword
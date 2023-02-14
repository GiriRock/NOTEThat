import { NextApiRequest, NextApiResponse } from "next";
const CryptoJS = require('crypto-js')


const resetPassword = async (req: NextApiRequest, res: NextApiResponse)=>{
    const currentDateTime = new Date()
    res.status(200).json({
        'email': CryptoJS.enc.Base64.parse(req.query['q']).toString(CryptoJS.enc.Utf8),
        'current': currentDateTime.toString(),
        'expiry': CryptoJS.enc.Base64.parse(req.query['t']).toString(CryptoJS.enc.Utf8)
    })
    // > Date.parse("Fri Feb 10 2023 13:04:24 GMT+0000 (Coordinated Universal Time)")
    // 1676034264000
    // > Date.parse("2023-02-11T16:41:39.060Z")
    // 1676133699060
    // > Date.parse("2023-02-11T16:42:39.060Z")
    // 1676133759060
}

export default resetPassword
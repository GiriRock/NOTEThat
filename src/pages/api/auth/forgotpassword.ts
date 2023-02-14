import { type NextApiRequest, type NextApiResponse } from "next";
const CryptoJS = require('crypto-js');

type Message = {
    message : string,
    response: string
}

type sendEmail = {
    email: string,
    subject: string,
    text: string
}


const forgotpassword = async (req: NextApiRequest, res: NextApiResponse<Message>) => {
    const emailId : string = req.body.email.toLowerCase()
    if(req.method === 'POST'){
        try {
            const currentDateTime = new Date()
            const expiry = new Date(currentDateTime.getTime() + 600000)
            const hashedUsername =  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(emailId));
            const hashedDateTime = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(expiry.toString()));
            const request : sendEmail = {
                email: emailId,
                subject: "reset password",
                text: "use this url to reset the password: " + `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/resetPassword?q=${hashedUsername}&t=${hashedDateTime}`
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendEmail`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                     request
                })
            })          
            const responsejson = await response.json()
            res.status(200).json({message: 'Email sent successfully', response : responsejson})
            return
        } catch (error: any) {
            res.status(400).json({message: 'invalid request', response : error.message})
            return
        }
    
    }
    res.status(405).json({message: `${req.method} not allowed`, response: 'failed'})
}

export default forgotpassword;


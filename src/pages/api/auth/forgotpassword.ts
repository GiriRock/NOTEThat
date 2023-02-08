import { type NextApiRequest, type NextApiResponse } from "next";
type Message = {
    message : string
}


const forgotpassword = async (req: NextApiRequest, res: NextApiResponse<Message>) => {
    const emailId = req.body.email.toLowerCase()
    if(req.method == 'POST'){
        try {
            
        } catch (error) {
            res.status(400).json({message: 'invalid request'})
            return
        }
    
    }
    res.status(405).json({message: `${req.method} not allowed`})
}

export default forgotpassword;


import { type NextApiRequest, type NextApiResponse } from "next";
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'testmailrapid1@gmail.com',
      // pass: 'hsqquupvwqalateg'
      user: `${process.env.EMAIL}`,
      pass: `${process.env.APP_PASS}`
    }
  });
  

type Message = {
    message : string
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse<Message>) => {
    const mailOptions = {
        from: 'Notethat@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.text
      };
    if(req.method === 'POST'){
        transporter.sendMail(mailOptions, function(error : any, info : any){
            if (error) {
              console.log(error);
              res.status(500).send({
                message : 'failed'
            })
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).send({
                message : 'success'
            })
            }
          });
    }else{
        res.status(405).send({message: `${req.method} not allowed`})
    }
}

export default sendEmail;

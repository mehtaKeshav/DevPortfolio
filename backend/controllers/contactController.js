require('dotenv').config()
const nodemailer = require('nodemailer')
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

//DOMPurify instance to clean up message sent from user 
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);


// function to check for Malicious code
const containsMaliciousPatterns = (text) => {
  const patterns = [
    /<script.*?>.*?<\/script>/gi, // Detect <script> tags
    /on\w+=".*?"/gi, // Detect inline event handlers (e.g., onclick)
    /javascript:/gi, // Detect JavaScript URIs
    /eval\(.*?\)/gi, // Detect eval()
    /<iframe.*?>/gi, // Detect iframes
  ];

  return patterns.some((pattern) => pattern.test(text));
};



const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, 
    port: process.env.MAIL_PORT,
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})
const sendEmail = async (req, res) =>{
    try{
        // console.log(req)
        const {fullname, email, message} = req.body
        console.log(fullname, "  ",  email, "  ", message)
        if (!fullname || !email || !message){
            return res.status(400).json({status: 'error', message: 'Missing required Fields'})
        }
        // Message Sanitization (converting it into plain HTML if there is)
        const sanitizedMessage = DOMPurify.sanitize(message);
        console.log("Sanitized Message:", sanitizedMessage);

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_ID,
            text: `Name: ${fullname}\nEmail: ${email}\n${sanitizedMessage}`,
            subject: `🚀NEW CONNECT🚀:- ${fullname}</h1>`
        }

        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent:', info.response)
        res.status(200).json({status: 'success'})
    }catch(err){
        console.error('Error sending email: ', err)
        res.status(500).json({status:'error', message: 'Error Sending email, please try again.'})
    }

}

module.exports = {sendEmail}
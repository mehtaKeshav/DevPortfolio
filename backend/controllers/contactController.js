require('dotenv').config()
const nodemailer = require('nodemailer')


const sendEmail = async (req, res) =>{
    const {fullName, email, message} = req.body

    if (!fullName || !email || !message){
        return res.status(400).json({status: 'error', message: 'Missing required Fields'})
    }

    const mailOptions = {
        from: email,
        to: process.env.EMAILID,
        text: message
    }

    const info = node

}

module.exports = {sendEmail}
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,

    auth: {
        user: process.env.nodeMailerEmail,
        pass: process.env.nodeMailerPassword
    },
    tls: { 
        rejectUnauthorized: false 
    }
});


const sendMail = (mailOptions) => {
    const defaultMailOptions = {
        from: process.env.nodeMailerFrom,
      };
    
    const finalMailOptions = {
        ...defaultMailOptions,
        ...mailOptions
    }
    transporter.sendMail(finalMailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendMail;
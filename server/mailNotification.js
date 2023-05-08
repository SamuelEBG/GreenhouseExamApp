const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();
const mg = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

function sendNotificationEmail(subject, text) {
    
    console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASSWORD);
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL_RECIPIENT,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendNotificationEmail
};

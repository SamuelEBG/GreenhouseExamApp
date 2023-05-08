const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
/*
const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/auth/google/callback'
    );
    
    oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });
    
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: oauth2Client.getAccessToken()
    }
    });
    
    const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: subject,
    text: text
    };
    
    transporter.sendMail({
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: subject,
    text: text,
    auth: {
    user: process.env.EMAIL,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: oauth2Client.getAccessToken()
    }
    }, function(error, info){
    if (error) {
    console.log(error);
    } else {
    console.log('Email sent: ' + info.response);
    }
    });

*/
const transporter = nodemailer.createTransport({
    service: 'gmail',
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
        to: process.env.EMAIL,
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

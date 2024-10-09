const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

async function sendOTP(email, otp) {
    try {
        const mailOptions = {
            from: {
                name: process.env.NAME,
                address: process.env.EMAIL
            },
            to: email,
            subject: 'Your OTP Code',
            text: `Dear User,\n\n` +
                `Your One Time Password (OTP) is: ${otp}\n\n` +
                `Please use this OTP to complete your action.\n\n` +
                `This OTP will expire in 5 minutes.\n\n` +
                `Thank you,\n`
        };

        await transporter.sendMail(mailOptions);
        return 'OTP sent successfully';
    } catch (error) {
        throw error;
    }
}

module.exports = { sendOTP };

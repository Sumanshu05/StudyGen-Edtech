const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Port 465 + secure:true (direct TLS) is more reliable than
        // port 587 (STARTTLS) on cloud hosts like Render
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,   // smtp.gmail.com
            port: 465,
            secure: true,                  // true = TLS from the start
            connectionTimeout: 30000,
            greetingTimeout: 30000,
            socketTimeout: 30000,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: `"StudyGen | Sumanshu Nagpal" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Mail sent:", info.response);
        return info;
    } catch (error) {
        console.error("mailSender error:", error.message);
        // Do not re-throw — callers handle missing email gracefully
    }
};

module.exports = mailSender;

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Brevo (formerly Sendinblue) SMTP relay — reliable on cloud hosts like Render
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,   // smtp-relay.brevo.com
            port: 587,
            secure: false,                 // STARTTLS (Brevo uses port 587)
            connectionTimeout: 30000,
            greetingTimeout: 30000,
            socketTimeout: 30000,
            auth: {
                user: process.env.MAIL_USER,  // Your Brevo login email
                pass: process.env.MAIL_PASS,  // Brevo SMTP Key (from Settings > SMTP & API)
            },
        });

        let info = await transporter.sendMail({
            from: `"StudyGen" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Mail sent via Brevo:", info.response);
        return info;
    } catch (error) {
        console.error("mailSender error:", error.message);
        // Do not re-throw — callers handle missing email gracefully
    }
};

module.exports = mailSender;

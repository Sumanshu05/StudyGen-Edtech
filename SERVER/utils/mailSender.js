const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Gmail SMTP — works reliably with a Gmail App Password
        // Generate App Password at: myaccount.google.com/apppasswords
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,   // SSL on port 465
            auth: {
                user: process.env.MAIL_USER?.trim(),         // Your Gmail address
                pass: process.env.MAIL_PASS?.replace(/\s/g, ""),  // Strip spaces — Google shows App Passwords with spaces for readability
            },
        });

        let info = await transporter.sendMail({
            from: `"StudyGen" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Mail sent via Gmail:", info.response);
        return info;
    } catch (error) {
        console.error("mailSender ERROR:", error.message);
        throw error;  // Re-throw so callers can see actual failures
    }
};

module.exports = mailSender;

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    const mailUser = process.env.MAIL_USER?.trim();
    const mailPass = process.env.MAIL_PASS?.replace(/\s/g, "");

    // Debug: log credential presence (never log the actual password)
    console.log("=== mailSender DEBUG ===");
    console.log("MAIL_USER:", mailUser || "❌ UNDEFINED");
    console.log("MAIL_PASS length:", mailPass ? mailPass.length : "❌ UNDEFINED");
    console.log("Sending to:", email);

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,  // SSL on port 465
            auth: {
                user: mailUser,
                pass: mailPass,
            },
        });

        // Verify SMTP connection before sending
        await transporter.verify();
        console.log("✅ SMTP connection verified successfully");

        let info = await transporter.sendMail({
            from: `"StudyGen" <${mailUser}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("✅ Mail sent via Gmail:", info.response);
        return info;
    } catch (error) {
        console.error("❌ mailSender ERROR:", error.message);
        console.error("Error code:", error.code);
        throw error;  // Re-throw so callers log it too
    }
};

module.exports = mailSender;

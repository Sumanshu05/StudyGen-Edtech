const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const mailSender = async (email, title, body) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    const mailUser = process.env.MAIL_USER?.trim();
    const mailPass = process.env.MAIL_PASS?.replace(/\s/g, "");

    // Debug: log credential presence
    console.log("=== mailSender DEBUG ===");
    console.log("RESEND_API_KEY present:", !!resendApiKey);
    console.log("MAIL_USER:", mailUser || "❌ UNDEFINED");
    console.log("MAIL_PASS length:", mailPass ? mailPass.length : "❌ UNDEFINED");
    console.log("Sending to:", email);

    if (resendApiKey) {
        try {
            console.log("Sending mail via Resend...");
            const resend = new Resend(resendApiKey);
            
            // Check if there is a custom sender email specified in environment, or default to onboarding
            const fromEmail = process.env.RESEND_FROM_EMAIL || "StudyGen <onboarding@resend.dev>";

            const { data, error } = await resend.emails.send({
                from: fromEmail,
                to: email,
                subject: title,
                html: body,
            });

            if (error) {
                console.error("❌ Resend API Error:", error);
                throw new Error(error.message || JSON.stringify(error));
            }

            console.log("✅ Mail sent via Resend, message ID:", data?.id);
            return {
                response: `Resend sent successfully (ID: ${data?.id})`,
                id: data?.id,
                data: data
            };
        } catch (error) {
            console.error("❌ Resend failed:", error.message);
            // If Resend failed, and we have Gmail credentials, we can fall back to Gmail!
            if (mailUser && mailPass) {
                console.log("🔄 Falling back to Gmail SMTP...");
            } else {
                throw error;
            }
        }
    }

    // Gmail SMTP fallback / default
    if (mailUser && mailPass) {
        try {
            console.log("Sending mail via Gmail SMTP...");
            let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST || "smtp.gmail.com",
                port: 465,
                secure: true,  // SSL on port 465
                auth: {
                    user: mailUser,
                    pass: mailPass,
                },
                connectionTimeout: 3000, // 3 seconds timeout
                greetingTimeout: 3000,   // 3 seconds timeout
                socketTimeout: 3000,     // 3 seconds timeout
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
            console.error("❌ mailSender SMTP ERROR:", error.message);
            console.error("Error code:", error.code);
            throw error;
        }
    } else {
        throw new Error("No mail configuration found. Please set RESEND_API_KEY or Gmail credentials.");
    }
};

module.exports = mailSender;

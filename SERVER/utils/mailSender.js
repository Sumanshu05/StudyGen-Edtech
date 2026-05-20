const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const mailSender = async (email, title, body) => {
    const brevoApiKey = process.env.BREVO_API_KEY?.trim();
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const mailUser = process.env.MAIL_USER?.trim();
    const mailPass = process.env.MAIL_PASS?.replace(/\s/g, "");

    // Debug: log credential presence
    console.log("=== mailSender DEBUG ===");
    console.log("RESEND_API_KEY present:", !!resendApiKey);
    console.log("MAIL_USER:", mailUser || "❌ UNDEFINED");
    console.log("MAIL_PASS length:", mailPass ? mailPass.length : "❌ UNDEFINED");
    console.log("Sending to:", email);

    // 1. Primary: Try Brevo (since it is free and allows sending to anyone without custom domain)
    if (brevoApiKey) {
        try {
            console.log("Sending mail via Brevo HTTP API...");
            const url = 'https://api.brevo.com/v3/smtp/email';
            
            // Check if there is a custom sender email specified, otherwise use default MAIL_USER
            const fromEmail = process.env.BREVO_FROM_EMAIL || mailUser || "info@studygen.com";
            const fromName = process.env.BREVO_FROM_NAME || "StudyGen";

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': brevoApiKey,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: { name: fromName, email: fromEmail },
                    to: [{ email: email }],
                    subject: title,
                    htmlContent: body
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || JSON.stringify(result));
            }

            console.log("✅ Mail sent via Brevo, message ID:", result.messageId);
            return {
                response: `Brevo sent successfully (ID: ${result.messageId})`,
                id: result.messageId,
                data: result
            };
        } catch (error) {
            console.error("❌ Brevo failed:", error.message);
            // If Brevo failed, fall through to other senders
        }
    }

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
        throw new Error("No mail configuration found. Please set BREVO_API_KEY, RESEND_API_KEY, or Gmail credentials.");
    }
};

module.exports = mailSender;

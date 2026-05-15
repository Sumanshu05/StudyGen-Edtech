const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
        //The document will be automatically deleted after 5 minutes of its creation time
    },
});

//Define a function => to send emails 
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email", emailTemplate(otp));
        if (mailResponse) {
            console.log("Email sent Successfully:", mailResponse.response);
        }
    }
    catch (error) {
        console.log("Error occured while sending mails: ", error);
        // Do NOT re-throw — let the OTP save succeed even if email fails
    }
}

// Pre-save hook — fire email in the background, don't block OTP.create()
OTPSchema.pre("save", function (next) {
    console.log("New OTP document being saved to database");

    // Only send email for new documents
    if (this.isNew) {
        // Fire-and-forget: email sends in background, API responds immediately
        sendVerificationEmail(this.email, this.otp).catch((error) => {
            console.error("Background email failed:", error.message);
        });
    }

    // Call next() immediately — don't wait for SMTP
    next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;

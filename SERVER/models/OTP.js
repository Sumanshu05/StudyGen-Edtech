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

// Pre-save hook — send email and wait for it to complete before saving
OTPSchema.pre("save", async function (next) {
    console.log("New OTP document being saved to database");

    // Only send email for new documents
    if (this.isNew) {
        try {
            await sendVerificationEmail(this.email, this.otp);
        } catch (error) {
            console.error("Background email failed:", error.message);
        }
    }

    next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;

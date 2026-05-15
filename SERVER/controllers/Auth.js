const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
//sendOTP
exports.sendOTP = async (req, res) => {

    try {
        //fetch email from request ki body
        const { email } = req.body;

        //check if the user already exist 
        const checkUserPresent = await User.findOne({ email });

        //if user already exist , then return a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User already registered',
            })
        }

        // Generate OTP
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Ensure unique OTP
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        // Store OTP in database
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body", otpBody);

        //return response successful 
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
        })
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

//signup
exports.signUp = async (req, res) => {

    try {

        //data fetch from request ki body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        //validate krlo 
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        //2 password match krlo 
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and ConfirmPassword Value does not match , Please Try Again',
            })
        }

        //check user already exist or not 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User is already registered',
            });
        }

        //validate OTP using DB
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("recentOtp", recentOtp);

        //validate OTP
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'OTP Not Found',
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP',
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        // let approved = ""
        // approved === "Instructor" ? (approved = false) : (approved = true)

        // accountType !== "Instructor" ? true :

        let approved = true ;

        //entry create in DB
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        //return res
        return res.status(200).json({
            success: true,
            message: 'User is registered Successfully',
            user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User Cannot be registered. Please try again',
        })
    }
}

//login controller for authenticatin users 
exports.login = async (req, res) => {
    try {
        //get data from the req body
        const { email, password } = req.body;

        //validation data
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            })
        }

        //Find user with provided email 
        const user = await User.findOne({ email }).populate("additionalDetails");

        //If user not found with provided email 
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered , please signup first",
            })
        }

        //generate JWT , after password matching 
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user.id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });
            
            //Save token to user document in database
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Logged In Successfully`,
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: `Password is Incoorect`,
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Login failure, please try again`,
        });
    }
};

//changePassword
exports.changePassword = async (req, res) => {
    try {

        //get user data from the req.user
        const userDetails = await User.findById(req.user.id);

        //get all passwords 
        const { oldPassword, newPassword, confirmPassword } = req.body;

        //validate the fields 
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //validate the entry recieved
        // if (newPassword !== confirmPassword) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Please Verify the password",
        //     });
        // }

        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        )

        if(!isPasswordMatch){
            //if old password does not match , return 401 unauthorized response
            return res.status(401).json({
                success: false,
                message: "The password is incorrect"
            })
        }

        //update password 
        const encryptedPassword = await bcrypt.hash(newPassword , 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password: encryptedPassword},
            {new: true}
        )

        //send notification email 
        try {
        const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res.status(200).json({ 
                            success: true, 
                            message: "Password updated successfully"
                         })
  } 
  catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}


    //     //find user by userid using jwt token ==> this is one of the secure method to find the user 
    //     const userId = req.user.id;
    //     const user = await User.findById(userId);

    //     if (!user) {
    //         return res.status(404).json({
    //             success: false,
    //             message: "User Not Found",
    //         });
    //     }

    //     //check if the user exist or not 
    //     const isMatch = await bcrypt.comapare(oldPassword, user.password);

    //     if (!isMatch) {
    //         return res.status(401).json({
    //             success: false,
    //             message: "old password is Incorrect",
    //         });
    //     }

    //     //hash the new password 
    //     const hashedPassword = await bcrypt.hash(newPassword, 10);

    //     //save the new password 
    //     user.password = hashedPassword;
    //     await user.save();

    //     //send the mail 
    //     await mailSender(
    //         user.email,
    //         "Your Password was Updated",
    //         `<h1>Password Updated Successfully</h1>
    //          <p>Your password has been changed. If this wasn’t you, please contact support immediately.</p>`
    //     );


    //     //send the response 
    //     return res.status(200).json({
    //         success: true,
    //         message: "Password Changed Successfully",
    //     });
    // }
    // catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //         success: false,
    //         message: "Something Went Wrong while upadating the password , please try again",
    //     });
    // }

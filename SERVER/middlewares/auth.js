//Importing the required modules 
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

// Configuring dotenv to load environment variables from .env file
dotenv.config();

//auth
//this function is used to authenticate the user requests 
exports.auth = async (req , res , next) => {
    try{
        
        //extracting the jwt token from the cookies , body or header 
        const token =   req.header("Authorization")?.replace("Bearer ", "")
                        || req.body?.token
                        || req.cookies?.token;

        // const token = req.header("Authorization")?.replace("Bearer ", "");

        console.log("Authorization Header:", req.header("Authorization"));
        console.log("TOKEN:", token)
        console.log("SECRET:", process.env.JWT_SECRET)  
        console.log("SECRET LENGTH:", process.env.JWT_SECRET?.length)

                        // console.log("Extracted Token:", token);
                        // //if token missing , then return Unauthorized response 
                        // console.log("JWT SECRET:", process.env.JWT_SECRET);
                        if(!token){
                            return res.status(401).json({
                                success: false,
                                message: `Token is missing`,
                            });
                        }

            //verify the JWT using the secret stored in the environment file 
            try{
                const decode = jwt.verify(token,process.env.JWT_SECRET);
                console.log(decode);
                //storing the decoded jwt in the request for the further use 
                req.user = decode;
            }
            catch(error){
                //verifiaction = issue 
                 console.log("JWT ERROR:", error.message) 
                return res.status(401).json({
                    success: false,
                    message: "Token is invalid",
                });
            }
            //if the jwt is valid then move on to the next handler or the middleware
            next();
    }
    //if there is an error during the authentication process
    catch(error){
        console.log("AUTH ERROR:", error.message);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validation the token",
        });
    }
};

//isStudent 
exports.isStudent = async(req , res , next) => {
    try{
        const userDetails = await User.findOne({ email: req.user.email }); 
        if(userDetails.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Student only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            succes: false,
            message: `User role cannot be verified , please try again`,
        });
    }
};


//isInstructor
// exports.isInstructor = async (req, res , next) => {
//     try{
//         const userDetails = await User.findOne({ email: req.user.email }); 
//         console.log(userDetails);
//         console.log(userDetails.accountType);
//         if(userDetails.accountType !== "Instructor" && !req.user.approved){
//             return res.status(401).json({
//                 success: false,
//                 message: "This is a protected route for the Instructor only",
//             });
//         }
//         next();
//     }
//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: "User role cannot be verified , please try again",
//         })
//     }
// };

exports.isInstructor = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (userDetails.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This route is only for Instructors",
      });
    }

    if (!userDetails.approved) {
      return res.status(401).json({
        success: false,
        message: "Instructor not approved yet",
      });
    }

    next();
  } catch (error) {
    console.log("IS INSTRUCTOR ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified , please try again",
    });
  }
};


//isAdmin
exports.isAdmin = async(req , res , next) => {
    try{
        const userDetails = await User.findOne({ email: req.user.email }); 
        if(userDetails.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified , please try again",
        })
    }
};

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel")
const sendToken = require("../utils/jwtToken")
const sendEmail =  require("../utils/sendEmail.js")
const crypto = require("crypto")


// Register a User
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{

    const {name, email, password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"This is a sample id",
            url:"profilepicUrl",
        }
    });

    // const token = user.getJWToken();

    // res.status(201).json({
    //     success:true,
    //     token,
    // });
    // Instead of writing these many lines we have completed the task in one line

    sendToken(user , 201, res)
});


// Login User

exports.loginUser = catchAsyncErrors(async (req,res,next) => {
    
    const { email, password } = req.body;

    // checking  if user has given password and email both

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password"),400);
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordmatched = user.comparePassword(password);

    if(!isPasswordmatched){
        return next(new ErrorHandler("Invalid email or password"),401)
    }

    // const token = user.getJWToken(password);

    // res.status(200).json({
    //     success:true,
    //     token,
    // });

    sendToken(user,200, res)

});


// Logout User

exports.logoutUser = catchAsyncErrors(async(req,res,next) => {

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success: true,
        message:"Logout Successfully"
    })
})


// Forgot Password

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email: req.body.email });

    if(!user) {
        return next(new ErrorHandler("User not found"), 404);
    }

    // Get ResetPassword token
    const resetToken = user.getResetPassToken();

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Ypur password reset token is:- ${resetPasswordUrl} \n\n If you have not requested this email then, please ignnore it`


    try{
        await sendEmail({
            email: user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully`
        })
    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message), 500);
    }
})


// Reset Password

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    //creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

      const user = await User.findOne({resetPasswordExpire,
    resetPasswordExpire: { $gdt: Date.now() },
});

if(!user) {
    return next(new ErrorHandler("Reset Password token is Invalid or has been expired"), 400);
}

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match"),400)
    }

    user.password= req.body.password
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined

    await user.save()

    sendToken(user,200, res)


})
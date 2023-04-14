const req = require("express/lib/request");
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const features = require("../features/features");
const asyncError = require("../middleware/asyncError");
const sendToken = require("../utils/sendToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const userSchema = new mongoose.Schema({
    name :{
      type : String,
      required : [true,"Please enter your name"],
      maxLength : [40,"Name cannot have more than 40 characters"],
      minLength : [4,"Name should have atleast 4 characters"]
    },
    email :{
      type : String,
      required : [true,"Please enter your email"],
      unique : true,  // only unique email should be there in the database.
      validate : [validator.isEmail, "Please enter a valid email"]
    },
    password :{
      type : String,
      required : [true,"Please enter your password"],
      minLength : [8,"Password should be greater than 8 characters"],
      select: false,
    },
    profile_pic :{
      public_id :{type:String, required:true},
      url : {type:String, required: true}
    },
    role :{
      type : String,
      default:"user"
    },
    createAt :{
      type : Date,
      default : Date.now,
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
});

userSchema.pre("save",async function(next){

    if(!this.isModified("password"))
      next();
    this.password = await bcryptjs.hash(this.password,10,);  // salt round = 10.

});

// JWT TOKEN: It will generate the token and store the token into cookie
userSchema.methods.getJWTtoken = function()
{
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
      expiresIn : process.env.JWT_EXPIRE,
    });
};
// compare password
userSchema.methods.comparePassword = async function(pwd)
{
  return bcryptjs.compare(pwd,this.password);
};

// reset password
userSchema.methods.resetPasswordtkn = function()
{
  // generate token to reset the password...
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hash the token and add it to the database of the correspondind user
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 30*60*1000; // token will be valid for 30 minutes.
  return resetToken; 

};

const User = mongoose.model("User",userSchema);

// Register a user
exports.userRegistration = asyncError(async(req,res)=>
{
  const {name,email,password} = req.body;

  // check if there is any account already exist with this mail id
  const userfromDB = await User.findOne({email : email}); 

  if(userfromDB)
    return res.json({success : false, message : "Already an account exists with the mail id"});

  const user = await User.create({
    name : name,
    email : email,
    password : password,
    profile_pic :{public_id:"This is a public id",url :"profilepicurl"},
  });
  // const token = user.getJWTtoken();
  // res.status(201).json({success : true, user,token});
  sendToken(user,201,res);

});

// Login user
exports.userLogin = asyncError ( async(req,res) =>
{
    const {email,password} = req.body;

    if(!email && !password)
      return res.json({success : false, message :"email and password is missing."});
    else if(!email && password)
      return res.json({success : false, message :"email is missing."});
    else if(email && !password)    
      return res.json({success : false, message :"password is missing."});

    const user = await User.findOne({email:email}).select("+password");

    if(!user)
      return res.json({success : false, message :"invalid email or password."});
    
    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect)
      return res.json({success : false, message :"invalid email or password."});
    
    // const token = user.getJWTtoken();
    // res.status(200).json({success : true,token});
    sendToken(user,200,res);

});

// user authentication
exports.isAuthenticatedUser = asyncError(async(req,res,next) =>
{
    const {token} = req.cookies; // token will be recieved into object type
    // console.log(token);
    if(!token)
      return res.json({success : false, message :"Please login to access the resources."});

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    
    req.user = await User.findById(decodedData.id);
    //  return res.json({success : true,products : "i"});
    next();
});


// user logout
exports.userLogout = asyncError(async (req,res,next)=>
{
    res.cookie("token",null,{expires : new Date(Date.now()), httpOnly:true}); 
    return res.status(200).json({success : true, message : "You have logged out successfully."});
});

// Check the role (is it Admin)
exports.isAdmin =  (...roles)=>
{
  return (req,res,next)=>{
      if(!roles.includes(req.user.role))
          return res.status(200).json({success : true, message : "only admin can access this page."});
          
      next();
  }
}; 

// Forgot Password (send link containg token to the user so that the user can follow that link to reset the password).
exports.forgotPassword = asyncError(async(req,res,next)=>
{
    const user = await User.findOne({email : req.body.email});

    if(!user)
      return res.json({success : true, message : "you don't have any account with this mail id"});
    
    // get reset password token 
    const resetToken =  user.resetPasswordtkn();

    await user.save({validateBeforeSave : false});  // in resetPasswordtkn function, only assignment of resetPasswordToken field was done not save so save the user here.

    const resetUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`; 

    const message = `Your Password reset token is (This link will be valid only for 30 minutes) - \n\n ${resetUrl}`;

    try
    {
       await sendEmail({
         email : user.email,
         subject : "Ecommerce Password Recovery",
         message,
       });

       res.status(200).json({success : true, message : `email sent to ${user.email} successfully`});
    }
    catch(error){
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({validateBeforeSave : false});
      return res.json({message : error.message});
    }
});

// Reset Password
exports.resetPassword = asyncError( async(req,res)=>
{
    // received token is in text form. So first convert it into hash to compare in the database.
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({resetPasswordToken : resetPasswordToken, resetPasswordExpire : {$gt : Date.now()}} );

    if(!user)
      return res.json({success : false, message : "reset password token is either invalid or has been expired"});
    
    if(req.body.password !== req.body.confirmPassword)
      return res.json({success : false, message : "Password does not match"});

    
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    sendToken(user,200,res);
    //return res.json({success : true, message : "Password updated successfully"});
});


// get user detail (if the user want to see his/her)
exports.getUserDetail = asyncError ( async(req,res)=>
{
    const user = await User.findById(req.user.id);  // coz during authentication we saved the info. of user in req.user 

    return res.json({success : true, user});

    
});

//update user password
exports.updateUserPassword = asyncError ( async(req,res)=>
{
    const user = await User.findById(req.user.id).select("+password");  // coz during authentication we saved the info. of user in req.user 

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched)
      return res.json({success : false, message : "wrong old password"});
    
    if(req.body.newPassword !== req.body.newConfirmedPassword)
      return res.json({success : false, message : "password didn't matched"});
    
    user.password = req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
});

//update user profile
exports.updateUserProfile = asyncError ( async(req,res)=>
{
    const userNewData = {
      name : req.body.name,
      email : req.body.email,
    };


    const user =await User.findByIdAndUpdate(req.user.id,userNewData,{new:true,runValidators:true, useFindAndModify: false});

    res.json({success : true, message : "profile updated successfully",user});
});

//get all users details (by Admin only)
exports.allUserDetail = asyncError(async(req,res)=>
{
  const users = await User.find();
  const numberOfUsers =await User.countDocuments();
  res.json({success : true,NumberOfUsers : numberOfUsers, users});
});

//get a user detail (by Admin only)
exports.UserDetailbyAdmin = asyncError(async(req,res)=>
{
  const user = await User.findById(req.params.id);

  if(!user)
    return res.json({success : true, message : `No such user found with ID : ${req.params.id}`});

  res.json({success : true, user});
});

//update user profile (by Admin only)
exports.updateUserProfilebyAdmin = asyncError ( async(req,res)=>
{
    const userNewData = {
      name : req.body.name,
      email : req.body.email,
      role : req.body.role,
    };

    const user =await User.findByIdAndUpdate(req.params.id,userNewData,{new:true,runValidators:true, useFindAndModify: false});

    res.json({success : true, message : "profile updated successfully (by admin)"});
});

//delete user profile by Admin
exports.deleteUserbyAdmin = asyncError ( async(req,res)=>
{
  //we will remove cloudnery
   const user = await User.findById(req.params.id);
  
   if(!user)
      return res.json({success : false, message : `not found such user with ID : ${req.params.id}`});

    await user.remove();
    res.json({success : true, message : "user deleted successfully (by admin)"});
});

// Get user detail of a product by giving its ID
exports.getUserDetailByAdmin =asyncError(async (req,res) =>
{
  let user = await User.findById(req.params.id);
  if(!user)
   return res.json({success : false, message :"user not found", status :404});
  return res.json({success : true, user});

});
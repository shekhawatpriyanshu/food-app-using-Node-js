const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt= require('jsonwebtoken')
const registerController = async (req, res) => {
  try {
    const { userName, password, phone, email, address,answer} = req.body;

    if (!userName || !password || !phone || !email || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide all field",
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "email already exists",
      });
    }
//hashing password
   var salt=bcrypt.genSaltSync(10);
 const hashPassword=await bcrypt.hash(password, salt)

    // create new user

    const user = await userModel.create({
      userName,
      email,
      password:hashPassword,
      address,
      phone,
      answer
    });
    res.status(201).send({
      success: true,
      message: "successfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error in register api",
      error,
    });
  }
};
// login 
const loginController=async(req,res)=>
  {
  try{
 const {email,password}=req.body
 if(!email || !password){
  return res.status(500).send({
    success: false,
    message:"please provide email or password",

  })
 }

 const user=await userModel.findOne({email})
 if(!user) {
  return res.status(404 ).send({
    success:false,
    message:"user not found"
  });
 }

// check user password \ compare password
const isMatch=await bcrypt.compare(password, user.password)
if(!isMatch) {
  return res.status(500).send({
    success:false,
    message:"invalid credentials"
  })

}
// token 
const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{
  expiresIn:"7d",
})
user.password=undefined;
 res.status(200).send({
  success:true,
  message:"login successfully",
  token,
  user
 });
}
  catch(error){
    console.log(error)
    res.status(500).send({
      success: false,
      message: "error in login api",
      error
    })
  }
}
module.exports = { registerController ,loginController };

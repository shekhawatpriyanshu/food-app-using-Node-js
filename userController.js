  // get user info 
  const userModel= require("../models/userModel")
  const bcrypt = require("bcryptjs")
  const getUserController= async (req,res) => {
    try{
 const user =await userModel.findById({_id:req.body.id})
 // validation
  if(!user){
    return res.status(404).send({
      success: false,
      message:"user not found"
    })
  }

// hide password

user.password=undefined;
res.status(200).send({
  success:true,
  message:"user get successfully",
  user
})
    }
    catch(error)
{
console.log(error);
res.status(500).send({
  success: false,
  message:"error in get user api "
})
}  
};

// update user 

const updateUserController =async(req,res)=>{
  try{
 const user= await userModel.findById({_id:req.body.id})
 if(!user){
  return res.status(404).send({
    success:false,
    message:"user not found"
  })
 }
const {userName,phone,address}=req.body
if(userName) user.userName=userName
if (address) user.address=address
if (phone) user.phone=phone
  //
  await user.save()
  res.status(200).send({
    success:true,
    message:"user updated successfully"
  })
  }
  catch(error){
    res.status(500).send({
      success:false,
      message:"error in update user api",
      error

    })
  }
  }

// update user password
 const updatePasswordController=async(req,res)=>{ 
  try{
    const user = await userModel.findById({_id:req.body.id});
    // validation
    if(!user){
      return res.status(404).send({
          success:false,
          message: 'User not found'
      }) 
    }
    // get data from user
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword){
      return res.status(500).send({
        success:false,
        message:"please enter old or new password"
      })
    }
    // check user password || compare password
    const isMatch=await bcrypt.compare(oldPassword, user.password)
    if(!isMatch) {
      return res.status(500).send({
        success:false,
        message:"invalid old password"
      })
    
    }
    var salt=bcrypt.genSaltSync(10);
     const hashPassword=await bcrypt.hash(newPassword, salt)
    user.password=hashPassword;
     await user.save()
     res.status(200).send({
      success: true,
      message:"password updated"
     })
 }catch(error){
  res.status(500).send({
    success:false,
    message:"error in password update api",
    error
  })
 }
 

 }
 // reset password
 const resetPasswordController=async(req,res) =>{
  try{
 const {email,newPassword,answer}=req.body
 if(!email || !newPassword || !answer){
  return res.status(500).send({
    success: false,
    message:"please provide all fields"
  })
 }
 const user = await userModel.findOne({email,answer})
 if(!user){
  return res.status(500).send({
    success: false,
    message:"user not found or invalid answer"
  })
 }
 // hasing password
 var salt = bcrypt.genSaltSync(10);
 const hashPassword = await bcrypt.hash(newPassword, salt);
 user.password=hashPassword
 await user.save();
 res.status(200).send({
success: true,
message:"password reset successfully"
 })
  }
  catch(error){
    res.status(500).send({
      success:false,
      message:"error in reset password",
      error
    })
  }

 }
 // delete account 
 const deleteProfileController =async(req,res)=>{
  try{
     await userModel.findByIdAndDelete(req.params.id)
     res.status(200).send({
      success: true,
      message:"your account has been deleted"

     })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error in delete profile",
    })
  }

 }


module.exports = { getUserController, updateUserController,
  updatePasswordController,
  resetPasswordController,deleteProfileController
 }
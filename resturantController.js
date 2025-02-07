const resturantModel=require("../models/resturantModel");

const createResturantController=async(req,res)=>{
    try{
      const {title,imageUrl,foods,time,pickup,delivery,isOpen,rating,logoUrl,ratingCount,code,coords}=req.body
      // valiidation
      if(!title || !coords){
       return  res.status(500).send({
            success:false,
            message:"please provide title and address"
        })
      }
      const newResturant = new resturantModel({
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        rating,
        logoUrl,
        ratingCount,
        code,
        coords,
      });
      await newResturant.save()
      res.status(201).send({
        success:true,
        message:"new resturant created successfully"
      });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in  create resturant api",
            error
        })
    }

}
// get all returant 
const getAllResturantController=async(req,res)=>{
  try{
   const resturant=await resturantModel.find({})
   if(!resturant){
    return res.status(404).send({
      success:false,
      message:"no resturant available"
    })
   }
   res.status(200).send({
    success:true,
   totalCount:resturant.length,
   resturant
   })
  }

catch(error){
  console.log(error)
  res.status(500).send({
    success: false,
    message:"error in get all resturant api",error
  })
}
}
// get resturant by id
const getResturantById = async(req,res) =>{
  try{
    const resturantId=req.params.id;
 if(!resturantId){
  return res.status(404).send({
    success: false,
    message:"no resturant found "
  })
 }

    // find resturant
 const resturant=await resturantModel.findById(resturantId);
  if(!resturant){
    return res.status(404).send({
      success:false,
      message:"no resturant found"
    })

  }
  res.status(200).send({
    sucess:true,
    resturant,
  })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error in get resturant id api",error
    })
  }

}
// delete resturant

 const deleteResturantController=async(req,res)=>{
  try{
 const resturantId=req.params.id;
 
 
 if(!resturantId){
  return res.status(404).send({
    success:false,
    message:"no resturant found"
  })
 }
 await resturantModel.findByIdAndDelete( resturantId)
 res.status(200).send({
  success:true,
  message:"resturant deleted successfully"
 })
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"error in delete resturant",error
    })
  }

 }
module.exports={createResturantController,getAllResturantController,getResturantById,
  deleteResturantController
}
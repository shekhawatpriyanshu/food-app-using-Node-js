const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController=async(req,res)=>{
    try{
const {title,description,price,imageUrl,foodTags,category,code,isAvailable,resturant,rating,ratingCount}=req.body
// validation
if(!title || !description || !price || !resturant ){
    return res.status(500).send({
        success:false,
        message:"please provide all fields"
    })
}
const newFood = new foodModel({
  title,
  description,
  price,
  imageUrl,
  foodTags,
  category,
  code,
  isAvailable,
  resturant,
  rating,
  ratingCount,
});

await newFood.save()
res.status(201).send({
    success:true,
    message:"food item created",newFood
})

    }catch(error){
        res.status(500).send({
            success:false,
            message:"error in create food api"
        })
    }

}// get all food
const getAllFoodController=async(req,res)=>{
    try{
const foods =await foodModel.find({})
if(!foods){
    return res.status(404).send({
        success:false,
        message:"food not found"
    })

}
res.status(200).send({
    success:true,
    totalFoods:foods.length,
    foods,
})
    }catch(error){
        res.status(500).send({
            success:false,
            message:"error in get all food api",
            error
            
        })
    }

}
//get single food
const getSingleFoodController=async(req,res)=>{
    try{
 const foodId=req.params.id
 if(!foodId) {
    return res.status(404).send({
        success: false,
        message:"please provide id"
    })

 }
  const food=await foodModel.findById(foodId)
  if(!food){
    return res.status(404).send({
        success:false,
        message: "  no food  found with this id"
    })
  }
  res.status(200).send({
    success:true,
    message:"food found with this id"
,
food
  })
    }catch(error){
        res.status(500).send({
            success: false,
            message:"error in get single  food"
        })
    }

}// get food by restaurant
const getFoodByResturantController=async(req,res)=>{
    try{
 const resturantId=req.params.id
 if(!resturantId) {
    return res.status(404).send({
        success: false,
        message:"please provide id"
    })

 }
  const food=await foodModel.find({resturant:resturantId})
  if(!food){
    return res.status(404).send({
        success:false,
        message: "  no food  found with this id"
    })
  }
  res.status(200).send({
    success:true,

    message:"food base on resturant"
,
food
  })
    }catch(error){
        res.status(500).send({
            success: false,
            message:"error in get single  food"
        })
    }

}
// update 
const updateFoodController=async(req,res)=>{
    try{
const foodID=req.params.id
if(!foodID) {
    return res.status(500).send({
        success:false,
        message:"no food id was found"
    })
}
    const food =await foodModel.findById(foodID)
    if(!food){
        return res.status(500).send({
            success:false,
            message:"no food found"
        })
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount,
      },
      { new: true }
    );
      res.status(200).send({
        success:true,
        message:"food item updated successfully",updatedFood
      })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in update",
            error
        })
    }

}
//delete
const deleteFoodController=async(req,res)=>{
    try{
        const foodId=req.params.id;
        if(!foodId) return
        res.status(404).send({
            success:false,
            message:"provide food id",
        })
        const food = await foodModel.findById(foodId)
        if(!food) return
        res.status(404).send({
            success:false,
            message:"no food found with this id"
        })
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success:true,
            message:"food deleted successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
         
            success:false,
            message:"error in delete  food api"
        })
    }

}
// place order
const placeOrderController=async(req,res)=>{
    try{
 const {cart}=req.body
 if(!cart ){
    return res.status(500).send({
        success:false,
        message:"please food cart or payment method"

    })

 }
 let total = 0
  cart.map((i) => {
    total +=i.price;
  })
  const newOrder=new orderModel({
    foods:cart,
    payment:total,
    buyer:req.body.id
  })
  await newOrder.save()
  res.status(201).send({
    success:true,
    message:"order placed successfully",
    newOrder
  })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in place order api"
        })
    }

}
// change order status
const orderStatusController=async(req,res)=>{
    try{
 const orderId=req.params.id;
 if(!orderId){
    return res.status(400).send({
        success:false,
        message:"pleasee provide valid order id"
    })
 }
 const{status}=req.body
 
 const order=await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
  
 res.status(200).send({
    success:true,
    message:"order status updated",
    order
 })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in  order status",error
        })
    }

}
module.exports={createFoodController,getAllFoodController,getSingleFoodController,getFoodByResturantController,updateFoodController,deleteFoodController,placeOrderController,orderStatusController}
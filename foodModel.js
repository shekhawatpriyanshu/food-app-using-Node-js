
const mongoose = require('mongoose');

// schema
 const foodSchema = new mongoose.Schema(
   {
     title: {
       type: String,
       required: [true, "food title is required"],
     },
     description: {
       type: String,
       required: [true, "food description is required"],
     },
     price: {
       type: Number,
       required: [true, "food price is required"],
     },
     imageUrl: {
       type: String,
       default:
         "https://thumbs.dreamstime.com/z/food-logo-smile-label-company-grocery-store-friendly-vector-illustration-smiling-mouth-symbol-135565322.jpg",
     },
     foodTags: {
       type: String,
     },
     category: {
       type: String,
     },
     code: {
       type: String,
     },
     isAvailable: {
       type: Boolean,
       default: true,
     },
     resturant: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Resturant",
     },
     rating: {
       type: Number,
       default: 5,
       min: 1,
       max: 5,
     },
     ratingCount: {
       type: String,
     },
   },

   { timestamps: true }
 );
 // export

 module.exports=mongoose.model('Foods',foodSchema)
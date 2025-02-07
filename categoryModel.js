
const mongoose = require('mongoose');

// schema
 const categorySchema = new mongoose.Schema(
   {
     title: {
       type: String,
       required: [true, "categrory title is required"],
     },
     imageUrl: {
       type: String,
       default:
         "https://thumbs.dreamstime.com/z/food-logo-smile-label-company-grocery-store-friendly-vector-illustration-smiling-mouth-symbol-135565322.jpg",
     },
   },

   { timestamps: true }
 );
 // export

 module.exports=mongoose.model('Category',categorySchema)
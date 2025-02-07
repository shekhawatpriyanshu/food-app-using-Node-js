const categoryModel = require("../models/categoryModel");

const createCatController=async(req,res)=>{
    try{
 const {title,imageUrl}=req.body;
 // validation
 if(!title ){
    return res.status(500).send({
        success:false,
        message:"please provide category title or image"
    })
}
 const newCategory= new categoryModel({title,imageUrl})
 await newCategory.save()
 res.status(201).send({
    success:true,
    message:"category created ",
    newCategory

 })
    }catch(error){
        console.log(error);
        res.status(500).send({
  success:false,
  message:"error in create cat api"
        })

    }

}
// get all categories
const getAllCatController=async(req,res)=>{
    try{
 const categories=await categoryModel.find({})
 if(!categories){
    return res.status(404).send({
        success:false,
        message:"no categories found"

    })
}
    res.status(200).send({
        success:true,
        totalCat:categories.length,
        categories

    })
    
    }catch(error){
        res.status(500).send({
            success:false,
            message:"error in get all category",
            error
        })
    }

}
// update cat 
const updateCatController=async(req,res) => {
    try{
 const {id}=req.params
 const{title,imageUrl}=req.body
 const updatedCategory=await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
 if(!updatedCategory){
    return res.status(500).send({
        success: false,
        message:"no category found"
    })
 }
 res.status(200).send({
    success: true,
    message:"category updated"
 })
    }catch(error){
        console.error(error)
        res.status(500).send({
            success:false,
            message:"error in update category",
            error
        })
    }

}
// delete category
const deleteCatController=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(500).send({
                success: false,
                message:"please provide category ID"
            })
        }
        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(500).send({
                success: false,
                message:"no category found with this id"
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"category deleted successfully"
        })
        
    }catch(error){
        res.status(500).send({
            success:false,
            message:"error in delete category",
            error
        })
    }

}
module.exports={createCatController,getAllCatController,updateCatController,
deleteCatController
}
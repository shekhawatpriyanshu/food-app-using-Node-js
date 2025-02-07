const express =require('express');
 const authMiddleware = require("../middlewares/authMiddleware");
const { createResturantController,getAllResturantController, getResturantById, deleteResturantController} = require('../controllers/resturantController');
 const router =express.Router();
// create resturant

router.post('/create',authMiddleware,createResturantController)

//  get all resturant 
router.get('/getAll',getAllResturantController)
// get returant by id 
router.get('/get/:id',getResturantById)

// delete resturant 
router.delete('/delete/:id',authMiddleware,deleteResturantController)
 module.exports =router
const express = require("express");
const { getUserController, updateUserController,updatePasswordController,resetPasswordController,deleteProfileController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router();

// get user \\ get 
router.get("/getUser",authMiddleware ,getUserController);

// update user profile
router.put('/updateuser',authMiddleware ,updateUserController);
// pasword update
router.post('/updatePassword',authMiddleware,updatePasswordController);
// reset password
router.post('/resetPassword',authMiddleware,resetPasswordController);
// delete user account
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)

module.exports = router;


const express = require("express");
const { auth } = require("../middleware/authoraization");

const { sendOtpToEmail, verifyOtp, loginUser, uploadFile, getUserProfile, loginUser2, registerUser, sendOtpToEmailUser, resetPassword } = require("../controller/authController");
const upload = require("../utils/uploadHandler")
const authRouter = express.Router();
authRouter.post('/sent-otp', sendOtpToEmail)
authRouter.post('/verify-otp', verifyOtp)
authRouter.post('/admin-login', loginUser)
authRouter.post("/uploadFile", upload.uploadFile, uploadFile);
authRouter.get('/getProfile', auth(), getUserProfile)
authRouter.post('/user-login', loginUser2)
authRouter.post('/registerUser', registerUser)
authRouter.post('/sendOtpToEmailUser', sendOtpToEmailUser)
authRouter.post('/verifyOtp', verifyOtp)
authRouter.post('/resetPassword', resetPassword)



module.exports = authRouter;


const express = require("express");
const { login ,sendOtp,verifyOtp,resetPassword} = require("../Controller/adminController");

const router = express.Router();

// POST /api/admin/login
router.post("/login", login);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);


module.exports = router;

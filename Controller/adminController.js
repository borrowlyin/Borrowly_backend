const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../Model/Admin");

const transporter = require("../Config/mailer");
const otpEmailTemplate = require("../utils/emailTemplate");

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find admin by email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate JWT Token
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    admin.reset_otp = otp;
    admin.reset_otp_expires = expires;
    admin.is_otp_verified = false;
    await admin.save();

    // TODO: send OTP via email / SMS
    await transporter.sendMail({
      from: `"Borrowly Support" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Your Borrowly OTP Code",
      html: otpEmailTemplate(otp),
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error in sendOtp:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin || admin.reset_otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const now = new Date();
    const expiry = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    if (now > expiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    admin.is_otp_verified = true;
    await admin.save({ fields: ["is_otp_verified"] }); // ✅ ensure save

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Error in verifyOtp:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// 3. Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin || !admin.is_otp_verified) {
  console.log("⚠️ is_otp_verified in DB:", admin ? admin.is_otp_verified : null);
  return res.status(400).json({ message: "OTP verification required" });
}

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    admin.password_hash = hashedPassword;
    admin.reset_otp = null;
    admin.reset_otp_expires = null;
    admin.is_otp_verified = false;

    await admin.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error in resetPassword:", err);
    res.status(500).json({ message: "Server error" });
  }
};
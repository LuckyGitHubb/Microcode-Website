const Otp = require("../model/otpModel");
const sendOTPEmail = require("../utils/mailSent");
const { User } = require("../model/userModel"); // Adjust path if needed
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const commonFunction = require("../utils/util")

exports.sendOtpToEmail = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({success:false ,message: "Email is required" });
    }

    // ✅ Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Remove existing OTPs for this email
    await Otp.deleteMany({ email });

    // ✅ Save OTP to DB with expiry
    const newOtp = new Otp({ email, otp });
    await newOtp.save();

    // ✅ Email content
    const subject = "Your One-Time Password (OTP) from Microcode Software";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello!</h2>
        <p>Here is your OTP to verify your email with Microcode Software:</p>
        <h1 style="color: #007bff;">${otp}</h1>
        <p>This OTP will expire in <strong>5 minutes</strong>.</p>
        <br />
        <p>Regards,<br />Microcode Software Team</p>
      </div>
    `;

    // ✅ Send email
    sendOTPEmail(email, subject, htmlContent);
console.log("otp is here---> ",otp)
    return res.status(200).json({
        success:true,
        message: "OTP sent successfully to the email",
        otp
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({
        success:false,
      message: "Error while sending OTP",
      error: error.message,
    });
  }
};
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(400).json({ success:false,message: "Email and OTP are required" });
    }

    // Find the OTP record
    const record = await Otp.findOne({ email, otp });

    if (!record) {
      return res.status(401).json({success:false, message: "Invalid OTP" });
    }

    // Check if expired (5 minutes = 300000ms)
    const now = Date.now();
    const createdAt = new Date(record.createdAt).getTime();

    if (now - createdAt > 5 * 60 * 1000) {
      // OTP expired — delete and return error
      await Otp.deleteOne({ _id: record._id });
      return res.status(410).json({ message: "OTP expired" });
    }

    // ✅ OTP is valid — delete after verification
    await Otp.deleteOne({ _id: record._id });

    return res.status(200).json({success:true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({
        success:false,
      message: "Error while verifying OTP",
      error: error.message,
    });
  }
};



exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // ✅ Compare password
    console.log(password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // ✅ Create JWT
    const token = jwt.sign(
      { userId: user._id,email: user.email, userType: user.userType },
      process.env.JWT_SECRET || "abc",
      { expiresIn: "7d" }
    );

    // ✅ Respond with user data and token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          permissions:user.permissions
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

exports.uploadFile = async (req, res) => {
     console.log("Form fields received:", Object.keys(req.body));
    console.log("Form files (req.file):", req.file);
  try {
    console.log("Uploaded file:", req.file);
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    let imageUrl = await commonFunction.getImageUrl(req.file);

    // If Cloudinary skipped the file (PDF/doc), serve it from our own backend
    if (!imageUrl) {
      const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3300}`;
      imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
      console.log("Serving file from backend:", imageUrl);
    } else {
      // Remove local copy only if uploaded to Cloudinary
      await commonFunction.removeFile(req.file.path);
    }

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: imageUrl,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during file upload",
      error: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // You should get `userId` from decoded JWT (set by middleware)
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Token missing or invalid.",
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Get User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user",
      error: error.message,
    });
  }
};
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // ✅ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user with isVerified set to false
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false, // User is not verified until OTP is confirmed
    });
    await newUser.save();

    // ✅ Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Remove existing OTPs for this email
    await Otp.deleteMany({ email });

    // ✅ Save OTP to DB with expiry
    const newOtp = new Otp({ email, otp });
    await newOtp.save();

    // ✅ Email content
    const subject = "Verify Your Email - Microcode Software";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello ${name}!</h2>
        <p>Welcome to Microcode Software! Please verify your email using the OTP below:</p>
        <h1 style="color: #007bff;">${otp}</h1>
        <p>This OTP will expire in <strong>5 minutes</strong>.</p>
        <br />
        <p>Regards,<br />Microcode Software Team</p>
      </div>
    `;

    // ✅ Send email
    sendOTPEmail(email, subject, htmlContent);
    console.log("Registration OTP:", otp);

    return res.status(201).json({
      success: true,
      message: "User registered successfully. OTP sent to email for verification.",
      data: {
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    console.error("Register User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// Login user with verification check
exports.loginUser2 = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // ✅ Check if user is verified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Email not verified. Please verify your email to login.",
      });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // ✅ Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || "abc",
      { expiresIn: "7d" }
    );

    // ✅ Respond with user data and token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          permissions: user.permissions,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};



exports.sendOtpToEmailUser = async (req, res) => {
  const { email, otpSource } = req.body;

  try {
    // ✅ Basic validation
    if (!email || !otpSource) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP source are required",
      });
    }

    if (!["registration", "forgotPassword"].includes(otpSource)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP source",
      });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (otpSource === "forgotPassword" && !user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    if (otpSource === "registration" && user) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // ✅ Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Remove existing OTPs for this email
    await Otp.deleteMany({ email });

    // ✅ Save OTP to DB with expiry
    const newOtp = new Otp({ email, otp });
    await newOtp.save();

    // ✅ Email content
    const subject = "Your One-Time Password (OTP) from Microcode Software";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello${user ? " " + user.name : ""}!</h2>
        <p>Here is your OTP to ${otpSource === "forgotPassword" ? "reset your password" : "verify your email"} with Microcode Software:</p>
        <h1 style="color: #007bff;">${otp}</h1>
        <p>This OTP will expire in <strong>5 minutes</strong>.</p>
        <br />
        <p>Regards,<br />Microcode Software Team</p>
      </div>
    `;

    // ✅ Send email
    sendOTPEmail(email, subject, htmlContent);
    console.log("otp is here---> ", otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to the email",
      otp,
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while sending OTP",
      error: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp, otpSource } = req.body;

  try {
    // ✅ Basic validation
    if (!email || !otp || !otpSource) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and OTP source are required",
      });
    }

    if (!["registration", "forgotPassword"].includes(otpSource)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP source",
      });
    }

    // ✅ Find the OTP record
    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ✅ Check if OTP is expired (5 minutes = 300000ms)
    const now = Date.now();
    const createdAt = new Date(record.createdAt).getTime();
    if (now - createdAt > 5 * 60 * 1000) {
      await Otp.deleteOne({ _id: record._id });
      return res.status(410).json({
        success: false,
        message: "OTP expired",
      });
    }

    // ✅ Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Handle based on otpSource
    if (otpSource === "registration") {
      // Update isVerified for account verification
      user.isVerified = true;
      await user.save();
    } else if (otpSource === "forgotPassword") {
      // Generate a reset token for forgot password flow
      const resetToken = Math.random().toString(36).slice(2);
      user.resetPasswordToken = resetToken;
      await user.save();
    }

    // ✅ OTP is valid — delete after verification
    await Otp.deleteOne({ _id: record._id });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: {
        resetToken: otpSource === "forgotPassword" ? user.resetPasswordToken : undefined,
      },
    });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while verifying OTP",
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, resetToken, password } = req.body;

  try {
    // ✅ Basic validation
    if (!email || !resetToken || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, reset token, and new password are required",
      });
    }

    // ✅ Find the user and validate reset token
    const user = await User.findOne({ email, resetPasswordToken: resetToken });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // ✅ Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // ✅ Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while resetting password",
      error: error.message,
    });
  }
};
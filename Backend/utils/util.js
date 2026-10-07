const jwt = require("jsonwebtoken");
// const twilio = require("twilio");
const fs = require("fs");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  getOTP() {
    var otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  },

  sendSms: async (to, message) => {
    try {
      const result = await client.messages.create({
        body: message,
        from: process.env.TWILIO_FROM_MOBILE_NUMBER,
        to: to
      });
      console.log('Message sent:', result.sid);
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  },

  getToken: async (payload) => {
    var token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  },

  generateRandomPassword: (length = 8) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  },


  sendMail: async (to, subject, text) => {
    var transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    var mailOptions = {
      from: "<do_not_reply@gmail.com>",
      to: to,
      subject: subject,
      text: text,
    };
    return await transporter.sendMail(mailOptions);
  },



  getImageUrl: async (files) => {
    console.log(process.env.CLOUDINARY_CLOUD_NAME);

    const pathModule = require("path");
    const ext = pathModule.extname(files.originalname || files.path || "").toLowerCase();
    const rawExtensions = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".zip", ".txt"];

    // For PDFs/docs — skip Cloudinary (it blocks them with 401 on free plans)
    // Return null so the controller serves them from the local /uploads folder
    if (rawExtensions.includes(ext)) {
      return null;
    }

    // For images — use Cloudinary as usual
    const result = await cloudinary.uploader.upload(files.path, {
      resource_type: "auto",
      type: "upload",
      access_mode: "public",
    });
    console.log("======>>>>", result.secure_url);
    return result.secure_url;
  },
  removeFile: async (path) => {
    if (path) {
      fs.unlink(path, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting uploaded file:", unlinkErr);
        }
      });
    }
  },
  calculateMatchScore: (userA, userB) => {
    let score = 0;
    let total = 0;

    const compareValues = (a, b) => {
      total += 1;
      if (a && b && a.toLowerCase() === b.toLowerCase()) score += 1;
    };

    const compareArrays = (a = [], b = []) => {
      total += 1;
      if (a.length && b.length) {
        const common = a.filter(val => b.includes(val));
        if (common.length) score += 1;
      }
    };

    compareValues(userA.gendervalue, userB.preferencesgender);
    compareValues(userB.gendervalue, userA.preferencesgender);

    compareArrays(userA.seeking, userB.seeking);
    compareArrays(userA.whoIAm, userB.whoIAm);
    compareArrays(userA.dateVibes, userB.dateVibes);
    compareArrays(userA.funFacts, userB.funFacts);
    compareArrays(userA.deepTalk, userB.deepTalk);
    compareArrays(userA.letsChat, userB.letsChat);
    compareArrays(userA.wellness, userB.wellness);
    compareArrays(userA.yourLikes, userB.yourLikes);

    compareValues(userA.drinkingvalue, userB.drinkingvalue);
    compareValues(userA.smokingvalue, userB.smokingvalue);
    compareValues(userA.drugsvalue, userB.drugsvalue);

    return Math.round((score / total) * 100);
  }
};


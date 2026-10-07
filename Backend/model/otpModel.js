const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    email: { type: String },
    otp:{type: String },
    createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Otp = mongoose.model("Otp", contactSchema);
module.exports = Otp;

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const paymentSchema = new schema({
  orderId: { type: String, required: true, unique: true },
  orderToken: { type: String },
  paymentSessionId: { type: String },
  orderAmount: { type: Number, required: true },
  orderCurrency: { type: String, default: "INR" },
  orderStatus: {
    type: String,
    enum: ["CREATED", "PAID", "FAILED", "EXPIRED"],
    default: "CREATED"
  },
  customerDetails: {
    customerId: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String },
    customerName: { type: String }
  },
  paymentDetails: {
    paymentId: { type: String },
    paymentMethod: { type: String },
    paymentTime: { type: Date }
  },
  cartItems: [
    {
      category: { type: String },
      id: { type: String },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number }
    }
  ],
  isVerified: { type: Boolean, default: false }
}, {
  timestamps: true,
  collection: "payments"
});

module.exports = mongoose.model("Payment", paymentSchema);

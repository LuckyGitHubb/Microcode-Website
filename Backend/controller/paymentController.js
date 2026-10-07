// ✅ BACKEND: Node.js Express Routes

// 1. ENV SETUP (.env file)
// --------------------------------
// CASHFREE_APP_ID=your_app_id
// CASHFREE_SECRET_KEY=your_secret_key
// CASHFREE_ENVIRONMENT=TEST or PROD

// 2. paymentController.js
const axios = require('axios');
require('dotenv').config();
const Payment = require('../model/transactionModel')

const BASE_URL = process.env.CASHFREE_ENVIRONMENT === 'PROD'
  ? 'https://api.cashfree.com/pg'
  : 'https://sandbox.cashfree.com/pg';

exports.createCashfreeOrder = async (req, res) => {
  const {
    name,
    email,
    phone,
    amount,
    billingAddress,
    shippingAddress,
    cartItems
  } = req.body;

  try {
    const orderId = `Order_${Date.now()}`;
const safeCustomerId = email.toLowerCase().replace(/[^a-z0-9_-]/g, "_");

    const payload = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "USD",
      customer_details: {
        customer_id: safeCustomerId,
        customer_email: email,
        customer_phone: phone,
        customer_name: name,
        customer_address: {
          first_name: billingAddress.firstName,
          last_name: billingAddress.lastName,
          address_line1: billingAddress.address,
          country: billingAddress.country,
        },
        customer_shipping_address: {
          first_name: shippingAddress.firstName,
          last_name: shippingAddress.lastName,
          address_line1: shippingAddress.address,
          country: shippingAddress.country,
        },
      },
      order_meta: {
        return_url: `https://microcodesoftware.com/`
        // return_url: `http://localhost:3000/`
      }
    };

    const response = await axios.post(`${BASE_URL}/orders`, payload, {
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01",
        "Content-Type": "application/json",
      },
    });

    // ✅ Store in database
    await Payment.create({
      orderId,
      orderToken: response.data.order_token,
      paymentSessionId: response.data.payment_session_id,
      orderAmount: amount,
      orderStatus: "CREATED",
      customerDetails: {
        customerId: safeCustomerId,
        customerEmail: email,
        customerPhone: phone,
        customerName: name,
        billingAddress,
        shippingAddress,
      },
      cartItems
    });

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: response.data,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: err.message,
    });
  }
};



exports.verifyCashfreeOrder = async (req, res) => {
  const { order_id } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}/orders/${order_id}`, {
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        'x-api-version': '2022-09-01',
      },
    });
console.log(response.data)
    const paymentStatus = response.data.order_status;

    // ✅ Update in database
    const updatedPayment = await Payment.findOneAndUpdate(
      { orderId: order_id },
      {
        orderStatus: paymentStatus,
        paymentDetails: {
          paymentId: response.data.payment_id,
          paymentMethod: response.data.payment_method,
          paymentTime: response.data.payment_time
        },
        isVerified: paymentStatus === "PAID"
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Order ${paymentStatus}`,
      status: paymentStatus,
      data: updatedPayment
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: 'Verification failed', error: err.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const payments = await Payment.find()
    const totalPayments = await Payment.countDocuments();
    return res.status(200).json({
      success: true,
      message: 'Transactions fetched successfully',
      data:payments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: err.message,
    });
  }
};
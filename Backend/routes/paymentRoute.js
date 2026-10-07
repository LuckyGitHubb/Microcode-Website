
const express = require("express");
const { createCashfreeOrder, verifyCashfreeOrder, getAllTransactions } = require("../controller/paymentController");
const router = express.Router();

// router.post('/post', addContact);

router.post('/createCashfreeOrder', createCashfreeOrder);

router.get('/verifyCashfreeOrder', verifyCashfreeOrder);
router.get('/getAllTransactions', getAllTransactions);


module.exports = router;

 
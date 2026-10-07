
const express = require("express");
const router = express.Router();

const {submitContact,
    updateContact,
    getAllContact,
    getByContact,
    deleteContact} = require('../controller/contactController');
const { auth } = require("../middleware/authoraization");

 
// router.post('/post', addContact);

router.get('/getAll', getAllContact);

router.post('/update',  updateContact);

router.get('/get',  getByContact);

router.post('/delete', deleteContact);

router.post("/post",  submitContact);
module.exports = router;

 
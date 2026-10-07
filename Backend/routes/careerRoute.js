
const express = require("express");
const router = express.Router();

const {addCareer,getAllCareer,deleteCareer} = require('../controller/careerController');
const { auth } = require("../middleware/authoraization");

 
router.post("/post",  addCareer);

router.get('/getAll', getAllCareer);

router.delete('/delete/:id', deleteCareer);

// router.post('/update',  updateContact);

// router.get('/get',  getByContact);


module.exports = router;

 
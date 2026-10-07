const express = require("express");
const router = express.Router();
const { dashboardController } = require("../controller/dashboardController");
const { auth } = require("../middleware/authoraization");
router.get('/get',auth(), dashboardController);
module.exports=router



 
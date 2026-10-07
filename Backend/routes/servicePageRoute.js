const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/authoraization");

const {saveOrUpdateServicePage, getAllServicePages, getServicePageBySlug, deleteServicePage} = require("../controller/servicePageController");

router.post('/createUpdate',  auth(),saveOrUpdateServicePage);
router.get('/getAll',  auth(),getAllServicePages);
router.get('/:slug',  getServicePageBySlug);
router.delete('/:id', auth(), deleteServicePage);

module.exports = router;

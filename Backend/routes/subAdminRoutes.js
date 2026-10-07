const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/authoraization");

const {
  createSubadmin,
  editSubadmin,
  deleteSubadmin,
  getAllSubadmins,
  getSingleSubadmin
} = require("../controller/subAdminController");

// 🔒 Only authenticated users can create/update/delete subadmins
router.post('/create', auth(), createSubadmin);
router.put('/edit/:id', auth(), editSubadmin);
router.delete('/delete/:id', auth(), deleteSubadmin);

// 🔓 Public or protected depending on use case (you can wrap in auth() if needed)
router.get('/all', auth(), getAllSubadmins);
router.get('/:id', auth(), getSingleSubadmin);

module.exports = router;

const express = require("express");
const { createCategory, getCategories, updateCategory, deleteCategory, getCategoriesWithBlogCount } = require("../controller/categoryController");
const { auth } = require("../middleware/authoraization");
const router = express.Router();

// Create category
router.post("/create", auth(), createCategory);

// Get all categories
router.get("/get", auth(), getCategories);

// Update category
router.patch("/:categoryId", auth(), updateCategory);

// Delete category
router.delete("/:categoryId", auth(), deleteCategory);
router.get("/getCategories",  getCategoriesWithBlogCount);

module.exports = router;

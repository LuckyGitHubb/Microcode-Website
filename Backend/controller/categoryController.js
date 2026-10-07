const { Category } = require("../model/categoryModel");

// ✅ Create category
exports.createCategory = async (req, res) => {
  const { name, categoryId } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Category name is required." });
  }
  if (categoryId) {
    try {
      const category = await Category.findByIdAndUpdate(
        categoryId,
        { name },
        { new: true }
      );
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Category updated", data: category });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  } else {
    try {
      const existing = await Category.findOne({ name });
      if (existing) {
        return res
          .status(409)
          .json({ success: false, message: "Category already exists." });
      }

      const category = await Category.create({ name });
      return res
        .status(200)
        .json({ success: true, message: "Category created", data: category });
    } catch (error) {
      console.error("Create Category Error:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  }
};

// ✅ Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Update category
exports.updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Category updated", data: category });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Delete category
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ New endpoint: Get all categories with blog count
exports.getCategoriesWithBlogCount = async (req, res) => {
  try {
    // Aggregate categories with blog counts
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "blogs", // Collection name in MongoDB (lowercase, pluralized by Mongoose)
          localField: "_id",
          foreignField: "category",
          as: "blogs",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          createdAt: 1,
          updatedAt: 1,
          blogCount: { $size: "$blogs" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Categories with blog counts retrieved successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Get Categories With Blog Count Error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error",
        error: error.message,
      });
  }
};
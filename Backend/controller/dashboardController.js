const { Blog } = require("../model/blogModel");
const { Category } = require("../model/categoryModel");
const Contact = require("../model/contactModel");
const { ServicePage } = require("../model/servicePageModel");

exports.dashboardController = async (req, res) => {
  try {
    const [blogCount, servicePageCount, contactCount, categoryCount] = await Promise.all([
      Blog.countDocuments(),
      ServicePage.countDocuments(),
      Contact.countDocuments(),
      Category.countDocuments()
    ]);
    const blogs = await Blog.find({}, "comments"); // Only get comments field
    let allComments = [];

    blogs?.forEach(blog => {
      if (Array.isArray(blog.comments)) {
        allComments = allComments.concat(blog.comments);
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        blogCount,
        servicePageCount,
        contactCount,
        categoryCount,
        totalComments: allComments.length,
        allComments
      }
    });
  } catch (error) {
    console.error("Error in dashboardController:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authoraization");
const { saveOrUpdateBlog, deleteBlog, replyToBlog, getAllBlogs, getBlogBySlug, searchBlogs } = require("../controller/blogController");

// Add or update blog (POST for create, PATCH for update)
router.post("/create", auth(),saveOrUpdateBlog);
router.patch("/update",auth(), saveOrUpdateBlog);

// Delete blog
router.delete("/:blogId",auth(), deleteBlog);
router.get("/get", getAllBlogs);

// Add comment
router.post("/:blogId/comment", auth(),replyToBlog);
router.get("/searchBlogs", searchBlogs);  // ✅ static path first
router.get('/:slug', getBlogBySlug);      // ✅ dynamic path after



module.exports = router;

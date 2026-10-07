const { Blog } = require("../model/blogModel");
// ✅ Add or Update Blog
exports.saveOrUpdateBlog = async (req, res) => {
  const { blogId, metaTitle, metaDescription, blogThumbnail, blogImage, title, slug, shortDescription, images, keywords, description, tags, categories } = req.body;
  const category = categories?.map(cat => cat.value)
  try {
    if (!slug || !title || !description) {
      return res.status(400).json({ success: false, message: "Slug, title, and detailed description are required." });
    }

    let blog;

    if (blogId) {
      blog = await Blog.findByIdAndUpdate(blogId, {
        slug,
        metaTitle,
        metaDescription,
        blogThumbnail,
        blogImage,
        title,
        shortDescription,
        keywords,
        description,
        tags,
        category
      }, { new: true });
    } else {
      blog = await Blog.create({
        slug,
        metaTitle,
        metaDescription,
        blogThumbnail,
        blogImage,
        title,
        shortDescription,
        images,
        keywords,
        description,
        tags,
        category
      });
    }

    return res.status(200).json({
      success: true,
      message: blogId ? "Blog updated successfully" : "Blog created successfully",
      data: blog
    });
  } catch (error) {
    console.error("Error in saveOrUpdateBlog:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Delete Blog
exports.deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(blogId);

    if (!blog) {
      return res.status(400).json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error in deleteBlog:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const { limit, searchQuery } = req.query;

    // Validate limit parameter
    let queryLimit = parseInt(limit, 10);
    if (limit && (isNaN(queryLimit) || queryLimit <= 0)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid limit parameter. It must be a positive number." });
    }

    // Build query
    let query = Blog.find();

    // Apply search filter if searchQuery is provided
    if (searchQuery && searchQuery.trim() !== '') {
      const regex = new RegExp(searchQuery.trim(), 'i'); // Case-insensitive regex
      query = query.find({
        $or: [
          { slug: { $regex: regex } },
          { title: { $regex: regex } },
          { description: { $regex: regex } },
        ],
      });
    }

    // Populate category, sort, and apply limit
    query = query
      .populate("category")
      .sort({ createdAt: -1 }); // -1 = descending order (newest first)

    if (queryLimit) {
      query = query.limit(queryLimit);
    }

    const blogs = await query;

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ success: false, message: "No blogs found" });
    }

    return res.status(200).json({
      success: true,
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Error in getAllBlogs:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
// ✅ Add comment to Blog
exports.replyToBlog = async (req, res) => {
  const { blogId } = req.params;
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.comments.push({ name, email, message });
    await blog.save();

    return res.status(200).json({ success: true, message: "Comment added", data: blog.comments });
  } catch (error) {
    console.error("Error in replyToBlog:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
// ✅ Get Blog by Slug
  exports.getBlogBySlug = async (req, res) => {
    const { slug } = req.params;
  console.log("ll")
    try {
      if (!slug) {
        return res.status(400).json({ success: false, message: "Slug is required." });
      }

      const blog = await Blog.findOne({ slug }).populate("category");

      if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found." });
      }

      return res.status(200).json({
        success: true,
        message: "Blog fetched successfully.",
        data: blog
      });
    } catch (error) {
      console.error("Error in getBlogBySlug:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  exports.searchBlogs = async (req, res) => {
    try {
      const { query } = req.query;
      console.log(query,"sdf")

      if (!query || query.trim() === '') {
        return res
          .status(400)
          .json({ success: false, message: "Search query is required" });
      }
      const blogs = await Blog.find({
        title: { $regex: query, $options: 'i' }, // Case-insensitive search
      })
        .select('title slug') // Only return title and slug
        .limit(10) // Limit to 10 suggestions
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: "Search suggestions retrieved successfully",
        data: blogs,
      });
    } catch (error) {
      console.error("Error in searchBlogs:", error);
      return res
        .status(500)
        .json({ success: false, message: "Server error", error: error.message });
    }
  };
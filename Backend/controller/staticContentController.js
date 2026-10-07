const  StaticContent  = require("../model/staticContent");

// ✅ Get Static Content by Type
exports.getByType = async (req, res) => {
  const { contentType } = req.params;

  try {
    if (!["PRIVACY_POLICY", "REFUND_POLICY", "TERMS_AND_CONDITIONS"].includes(contentType)) {
      return res.status(400).json({ success: false, message: "Invalid content type" });
    }

    const content = await StaticContent.findOne({ contentType });
    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Content retrieved successfully",
      data: content
    });
  } catch (error) {
    console.error("Error in getByType:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Edit Static Content
exports.edit = async (req, res) => {
  const { contentType } = req.params;
  const { title, description } = req.body;

  try {
    if (!["PRIVACY_POLICY", "REFUND_POLICY", "TERMS_AND_CONDITIONS"].includes(contentType)) {
      return res.status(400).json({ success: false, message: "Invalid content type" });
    }

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    const content = await StaticContent.findOneAndUpdate(
      { contentType },
      { title, description },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: content
    });
  } catch (error) {
    console.error("Error in edit:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
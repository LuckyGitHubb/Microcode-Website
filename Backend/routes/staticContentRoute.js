const express = require("express");
const { auth } = require("../middleware/authoraization");
const { getByType, edit } = require("../controller/staticContentController");

const staticContentRouter = express.Router();

// ✅ Get static content by type
staticContentRouter.get("/:contentType", getByType);

// ✅ Edit static content (protected by auth middleware)
staticContentRouter.put("/:contentType", auth(), edit);

module.exports = staticContentRouter;
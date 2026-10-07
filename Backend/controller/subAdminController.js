const { User } = require("../model/userModel");
const bcrypt = require("bcryptjs");

exports.createSubadmin = async (req, res) => {
  const { name, email, password, permissions } = req.body;

  try {
    // ✅ Basic validation
    if (!name || !email || !password || !permissions) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, password, permissions) are required",
      });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create SubAdmin user
    const subadmin = await User.create({
      name,
      email,
      password: hashedPassword,
      userType: "SubAdmin",
      permissions,
    });

    return res.status(201).json({
      success: true,
      message: "SubAdmin created successfully",
      data: {
        id: subadmin._id,
        name: subadmin.name,
        email: subadmin.email,
        userType: subadmin.userType,
        permissions: subadmin.permissions,
      },
    });
  } catch (error) {
    console.error("SubAdmin Creation Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating SubAdmin",
      error: error.message,
    });
  }
};
exports.editSubadmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, permissions } = req.body;

  try {
    const subadmin = await User.findById(id);

    if (!subadmin || subadmin.userType !== 'SubAdmin') {
      return res.status(404).json({
        success: false,
        message: "SubAdmin not found",
      });
    }

    // ✅ Update fields
    if (name) subadmin.name = name;
    if (email) subadmin.email = email;
    if (permissions) subadmin.permissions = permissions;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      subadmin.password = hashedPassword;
    }

    await subadmin.save();

    return res.status(200).json({
      success: true,
      message: "SubAdmin updated successfully",
      data: {
        id: subadmin._id,
        name: subadmin.name,
        email: subadmin.email,
        permissions: subadmin.permissions,
      },
    });
  } catch (error) {
    console.error("SubAdmin Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating SubAdmin",
      error: error.message,
    });
  }
};
exports.deleteSubadmin = async (req, res) => {
  const { id } = req.params;

  try {
    const subadmin = await User.findById(id);

    if (!subadmin || subadmin.userType !== 'SubAdmin') {
      return res.status(404).json({
        success: false,
        message: "SubAdmin not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "SubAdmin deleted successfully",
    });
  } catch (error) {
    console.error("SubAdmin Deletion Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting SubAdmin",
      error: error.message,
    });
  }
};
exports.getAllSubadmins = async (req, res) => {
  try {
    const subadmins = await User.find({ userType: 'SubAdmin' }).select('-password');

    return res.status(200).json({
      success: true,
      message: "SubAdmins fetched successfully",
      data: subadmins,
    });
  } catch (error) {
    console.error("Error fetching subadmins:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching SubAdmins",
      error: error.message,
    });
  }
};
exports.getSingleSubadmin = async (req, res) => {
  const { id } = req.params;

  try {
    const subadmin = await User.findById(id).select('-password');

    if (!subadmin || subadmin.userType !== 'SubAdmin') {
      return res.status(404).json({
        success: false,
        message: "SubAdmin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "SubAdmin fetched successfully",
      data: subadmin,
    });
  } catch (error) {
    console.error("Error fetching subadmin:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching SubAdmin",
      error: error.message,
    });
  }
};

const { ServicePage } = require('../model/servicePageModel');

// Create a new service page

exports.saveOrUpdateServicePage = async (req, res) => {
  const {
    servicePageId,
    slug,
    metaTitle,
    metaDescription,
    serviceName,
    title,
    bannerImage,
    description,
    keywords,
    whyChooseUs,
    featureSection,
    faqSection
  } = req.body;

  try {
    // Required fields validation

    if (slug) {
  const existing = await ServicePage.findOne({ slug: slug });
  if (existing && (!servicePageId || existing._id.toString() !== servicePageId)) {
    return res.status(400).json({
      success: false,
      message: "This slug already exists"
    });
  }
}

    if (!slug || !serviceName || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Slug, service name, title, and description are required."
      });
    }

    let servicePage;

    if (servicePageId) {
      // Update existing service page
      servicePage = await ServicePage.findByIdAndUpdate(
        servicePageId,
        {
          slug,
          metaTitle,
          metaDescription,
          serviceName,
          title,
          bannerImage,
          description,
          keywords,
          whyChooseUs,
          featureSection,
          faqSection
        },
        { new: true, runValidators: true }
      );
    } else {
      // Create new service page
      servicePage = await ServicePage.create({
        slug,
        metaTitle,
        metaDescription,
        serviceName,
        title,
        bannerImage,
        description,
        keywords,
        whyChooseUs,
        featureSection,
        faqSection
      });
    }

    return res.status(200).json({
      success: true,
      message: servicePageId
        ? "Service page updated successfully"
        : "Service page created successfully",
      data: servicePage
    });

  } catch (error) {
    console.error("Error in saveOrUpdateServicePage:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// Get all service pages
exports.getAllServicePages = async (req, res) => {
  try {
    const services = await ServicePage.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service pages',
      error: error.message
    });
  }
};

// Get service page by slug
exports.getServicePageBySlug = async (req, res) => {
  try {
    const service = await ServicePage.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service page not found'
      });
    }
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service page',
      error: error.message
    });
  }
};

// Update service page by ID
exports.updateServicePage = async (req, res) => {
  try {
    const updatedService = await ServicePage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedService) {
      return res.status(404).json({
        success: false,
        message: 'Service page not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Service page updated successfully',
      data: updatedService
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update service page',
      error: error.message
    });
  }
};

// Delete service page by ID
exports.deleteServicePage = async (req, res) => {
  try {
    const deletedService = await ServicePage.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: 'Service page not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Service page deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete service page',
      error: error.message
    });
  }
};

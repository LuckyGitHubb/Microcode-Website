const mongoose = require('mongoose');
const servicePageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  // Title + Banner Section
  serviceName: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  metaTitle: {
    type: String,
    required: true,
    trim: true
  },
  metaDescription: {
    type: String,
    required: true,
    trim: true
  },
  bannerImage: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
    trim: true
  },

  // Why Choose Us Section
  whyChooseUs: {
    image: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String }
  },

  // Feature Section
  featureSection: {
    title: { type: String },
    description: { type: String },
    features: [
      {
        type: String,
        trim: true
      }
    ]
  },

  // FAQ Section
  faqSection: {
    description: { type: String },
    questions: [
      {
        question: { type: String, trim: true },
        answer: { type: String }
      }
    ]
  }
}, {
  timestamps: true
});

const ServicePage = mongoose.model('ServicePage', servicePageSchema);
module.exports = { ServicePage };

const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  slug: {
    type: String,
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
  shortDescription: {
    type: String,
    trim: true
  },
   blogThumbnail: 
    {
      type: String, // Store image URLs or paths
      trim: true
    }
  ,
   blogImage: 
    {
      type: String, // Store image URLs or paths
      trim: true
    }
  ,
  keywords: 
    {
      type: String,
      trim: true
    }
  ,
  comments: [
    {
      name: { type: String, trim: true },
      email: { type: String, trim: true },
      message: { type: String, trim: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  description: {
    type: String,
    required: true
  },
  tags: 
    {
      type: String,
      trim: true
    }
  ,
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category' // Reference to Category model
    }
  ]
}, {
  timestamps: true // adds createdAt and updatedAt
});
// blogSchema.pre("validate", async function (next) {
//   if (this.title && !this.slug) {
//     let baseSlug = slugify(this.title, { lower: true, strict: true });
//     let slug = baseSlug;
//     let counter = 1;

//     // Check for uniqueness
//     while (await mongoose.models.Blog.findOne({ slug: slug })) {
//       slug = `${baseSlug}-${counter++}`;
//     }

//     this.slug = slug;
//   }
//   next();
// });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = { Blog };

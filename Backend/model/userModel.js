const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1. Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  userType: {
    type: String,
    enum: ['Admin', 'Customer', 'SubAdmin'],
    default: 'Customer'
  },
  permissions: [
    {
      moduleName: { type: String },
      isAllow: { type: Boolean }
    }
  ],
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// 3. Create model
const User = mongoose.model('User', userSchema);

// 4. Create default admin (runs immediately)
(async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com', userType: 'Admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        phoneNumber: '1234567890',
        userType: 'Admin'
      });
      await admin.save();
      console.log('✅ Default admin created: admin@example.com');
    } else {
      console.log('ℹ️ Admin already exists:', adminExists.email);
    }
  } catch (err) {
    console.error('❌ Error creating default admin:', err.message);
  }
})();

// 5. Export model
module.exports = { User };
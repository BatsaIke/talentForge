const mongoose = require('mongoose');

const CompanyProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  industry: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  website: {
    type: String
  },
  logo: {
    type: String
  },
  employees: {
    type: Number
  },
  founded: {
    type: Date
  },
  contact: {
    email: {
      type: String
    },
    phone: {
      type: String
    }
  },
  social: {
    linkedin: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('companyProfile', CompanyProfileSchema);

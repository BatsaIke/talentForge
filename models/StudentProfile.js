const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  certUrl: {
    type: String, // Assuming you store the URL/path to the uploaded PDF
  },
  cvUrl: {
    type: String, // Assuming you store the URL/path to the uploaded CV
    required: true
  },
  coverLetterUrl: {
    type: String // Assuming you store the URL/path to the uploaded cover letter
  }
});

const StudentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  projects: [
    {
      title: {
        type: String,
      },
      description: {
        type: String
      },
      technologies: {
        type: [String]
      },
      link: {
        type: String
      }
    }
  ],
  certificates: [CertificateSchema],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
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

module.exports = mongoose.model('studentProfile', StudentProfileSchema);

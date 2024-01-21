const mongoose = require('mongoose');

const JobPostSchema = new mongoose.Schema({
  company: {
    // Store only specific fields from the company profile
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companyProfile'
    },
    name: String,
    industry: String,
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String
  },
  responsibilities: {
    type: String
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship']
  },
  salary: {
    type: Number
  },
  applicationDeadline: {
    type: Date
  },
  applicants: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentProfile'
      },
      status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Rejected', 'Hired']
      }
    }
  ],
  datePosted: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('jobPost', JobPostSchema);

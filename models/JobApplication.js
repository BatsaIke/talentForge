const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Reference to the user model
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobPost', // Reference to the job post model
    required: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String, 
    enum:["Applied","Shortlisted","Hired", "Rejected"],// You can change the type based on your needs (e.g., 'applied', 'shortlisted', etc.)
    default: 'Applied', // Default status if not provided
  },
  // Add any other relevant fields you want to store for the application
});

module.exports = mongoose.model('jobApplication', JobApplicationSchema);

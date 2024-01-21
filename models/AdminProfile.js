const mongoose = require('mongoose');

const AdminProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  role: {
    type: String,
    enum: ['Admin', 'Marketer', 'Developer', 'Sales', 'Help Desk'],
    default: 'Admin'
  },
 
   date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('adminProfile', AdminProfileSchema);

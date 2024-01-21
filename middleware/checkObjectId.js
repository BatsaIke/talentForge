const mongoose = require('mongoose');

// middleware to check for a valid object id
const checkObjectId = (idToCheck) => (req, res, next) => {
  console.log('Checking ObjectId:', req.params); // Add this line for debugging
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck])) {
    console.log('Invalid ObjectId'); // Add this line for debugging
    return res.status(400).json({ msg: 'Invalid ID' });
  }
  next();
};

module.exports = checkObjectId;

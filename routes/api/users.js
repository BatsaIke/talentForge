const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { createUserDetails } = require('../../controller/usersController');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post([
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })],createUserDetails) 
  

module.exports = router;

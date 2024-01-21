const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check} = require('express-validator');
const { createCompany, getCurrentCompany, deleteCompanyProfile,getAllCompanyProfiles } = require('../../controller/companyController');

// @route    POST api/company-profile
// @desc     Create or update company profile
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required').notEmpty(),
    check('industry', 'Industry is required').notEmpty(),
  ],createCompany)

  // @route    GET api/v1/company
// @desc     Get all  company profiles
  .get('/', auth, getAllCompanyProfiles);


// @route    GET api/company-profile/me
// @desc     Get current user's company profile
router.get('/me', auth, getCurrentCompany);

// @route    DELETE api/company-profile
// @desc     Delete current user's company profile
// @access   Private
router.delete('/', auth, 
  deleteCompanyProfile);
  
  module.exports = router;
  


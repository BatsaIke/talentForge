
const { validationResult } = require("express-validator");
const CompanyProfile = require('../models/CompanyProfile')
const Profile = require('../models/CompanyProfile')

// @route    GET api/profiles
// @desc     Get all profiles
// @access   Public
const getAllCompanyProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name',"role", 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @route    POST api/company-profile
// @desc     Create or update company profile
// @access   Private
const createCompany = async(req,res)=>{ 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      industry,
      description,
      location,
      website,
      logo,
      employees,
      founded,
      contact,
      social,
    } = req.body;

    // Build company profile object
    const companyProfileFields = {
      user: req.user.id,
      name,
      industry,
      description,
      location,
      website,
      logo,
      employees,
      founded,
      contact,
      social,
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let companyProfile = await CompanyProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: companyProfileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.json(companyProfile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  
}

// @route    GET api/company-profile/me
// @desc     Get current user's company profile
// @access   Private

const getCurrentCompany=async(req, res)=>{
  try {
    const companyProfile = await CompanyProfile.findOne({
      user: req.user.id,
    });

    if (!companyProfile) {
      return res
        .status(400)
        .json({ msg: 'There is no company profile for this user' });
    }
    res.json(companyProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

// @route    DELETE api/company-profile
// @desc     Delete current user's company profile
// @access   Private
const deleteCompanyProfile=async(req, res)=>{
  try {
    // Remove company profile
    await CompanyProfile.findOneAndRemove({ user: req.user.id });

    res.json({ msg: 'Company profile deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}




module.exports = {
  createCompany,
  getCurrentCompany,
  deleteCompanyProfile,
  getAllCompanyProfiles

}
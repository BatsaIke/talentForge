const express = require('express');
const router = express.Router();
const checkObjectId = require('../../middleware/checkObjectId');
const auth = require('../../middleware/auth');
const { check} = require('express-validator');
const {
  getUserProfile,
  createUserProfile,
  deleteAProfileExperience,
  updateAProfileEducation,
  deleteAProfileEducation,
  getGithubRepo,
  updateAProfileProject,
  deleteAProfileProject,
  updateAProfileCertificate,
  deleteAProfileCertificate,
  getAllProfiles,
  getSingleProfile,
} = require('../../controller/profilesController');

// get user profile
router.get('/me', auth, getUserProfile)
//get all profiles
.get('/', getAllProfiles);

// create or update user profile
router.post(
  '/',
  auth,
  [
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
    check('certificates', 'CV is required').notEmpty(),

  ],
  createUserProfile
);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',checkObjectId('user_id'), auth, getSingleProfile
);


// delete profile experience
router.delete('/experience/:exp_id',checkObjectId('exp_id'), auth, deleteAProfileExperience);

router.put(
  '/education',
  auth,
  [
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of study is required').notEmpty(),
    check(
      'from',
      'From date is required and needs to be from the past'
    ).notEmpty().custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  ],
  updateAProfileEducation
);

// delete profile education
router.delete('/education/:edu_id', checkObjectId('edu_id'),auth, deleteAProfileEducation);

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
router.get('/github/:username', getGithubRepo);

// @route    PUT api/profile/projects
// @desc     Add profile projects
router.put(
  '/projects',
  auth,
  [
    check('title', 'Project title is required').notEmpty(),
    check('description', 'Project description is required').notEmpty(),
  ],
  updateAProfileProject
);

// @route    DELETE api/profile/projects/:project_id
router.delete('/projects/:project_id', checkObjectId('project_id'),auth, deleteAProfileProject);

// @route    PUT api/profile/certificates
// @desc     Add profile certificates
// @access   Private
router.put(
  '/certificates',
  auth,
  [check('cvUrl', 'CV is required').notEmpty()],
  updateAProfileCertificate
);

// @route    DELETE api/profile/certificates/:certificate_id
// @desc     Delete certificate from profile
router.delete('/certificates/:certificate_id',checkObjectId('certificate_id'), auth, deleteAProfileCertificate);

module.exports = router;

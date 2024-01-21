const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { applyForJob, getUserApplications } = require('../../controller/jobApplyController');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/job-applications/:jobId
// @desc     Apply for a job
// @access   Private
router.post('/:jobId',checkObjectId('jobId'),  auth, applyForJob);

// @route    GET api/job-applications
// @desc     Get user's job applications
// @access   Private
router.get('/', auth, getUserApplications);

module.exports = router;

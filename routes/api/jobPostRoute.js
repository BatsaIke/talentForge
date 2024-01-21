const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  getAllJobPosts,
  shortlistApplicant,
  getJobPostById,
  deleteJobPost,
  rejectApplicant,
  hireApplicant,
  createJobPost,
  updateJobPost,
} = require('../../controller/jobPostController');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/job-posts
// @desc     Create or update a job post
// @access   Private
router.post('/', auth, createJobPost);

// @route    POST api/v1/job
// @desc     Create or update a job post
// @access   Private
router.put('/:job_id', checkObjectId('job_id'), auth, updateJobPost);

// @route    GET api/job-posts
// @desc     Get all job posts for the company
// @access   Private
router.get('/', auth, getAllJobPosts);

// @route    GET api/job-posts/:id
// @desc     Get a single job post by ID
// @access   Private
router.get('/:id',checkObjectId('id'), auth, getJobPostById);

// @route    PUT api/job-posts/:id/shortlist
// @desc     Shortlist an applicant for a job post
// @access   Private
router.put('/:id/shortlist',checkObjectId('id'), auth, shortlistApplicant);

// @route    PUT api/job-posts/:id/reject
// @desc     Reject an applicant for a job post
// @access   Private
router.put('/:id/reject', checkObjectId('id'), auth, rejectApplicant);

// @route    PUT api/job-posts/:id/hire
// @desc     Hire an applicant for a job post
// @access   Private
router.put('/:id/hire',checkObjectId('id'), auth, hireApplicant);

// @route    DELETE api/job-posts/:id
// @desc     Delete a job post
// @access   Private
router.delete('/:id',checkObjectId('id'), auth, deleteJobPost);

module.exports = router;

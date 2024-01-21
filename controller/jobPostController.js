const { validationResult } = require('express-validator');
const JobPost = require('../models/jobPost');
const CompanyProfile = require('../models/CompanyProfile');
const JobApplication = require('../models/JobApplication');


// @route    POSTapi/v1/student/job
// @desc     Create or update a job post
// @access   Private
const createJobPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    location,
    description,
    requirements,
    responsibilities,
    employmentType,
    salary,
    applicationDeadline,
  } = req.body;

  try {
   // Fetch the company profile and assign it to req.user
   const companyProfile = await CompanyProfile.findOne({ user: req.user.id });
   if (!companyProfile) {
     console.error('Company profile not found for user:', req.user.id);
     return res.status(404).json({ msg: 'Company profile not found' });
   }

   req.user.CompanyProfile = companyProfile;
  
   // Retrieve the complete company profile
   const fullCompanyProfile = await CompanyProfile.findById(req.user.CompanyProfile._id);
   if (!fullCompanyProfile) {
     console.error('Full company profile not found for id:', req.user.CompanyProfile._id);
     return res.status(404).json({ msg: 'Full company profile not found' });
   }

    const jobPostFields = {
      company: {
        id: fullCompanyProfile._id.toString(),
        name: fullCompanyProfile.name,
        industry: fullCompanyProfile.industry,
      },
      title,
      location,
      description,
      requirements,
      responsibilities,
      employmentType,
      salary,
      applicationDeadline,
    };

    const jobPost = new JobPost(jobPostFields);
    await jobPost.save();

    return res.json(jobPost);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

// @route    PUT api/v1/student/job
// @desc     Update a job post
// @access   Private
const updateJobPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const jobId = req.params.job_id; // Use 'job_id' instead of 'jobId'
  const {
    title,
    location,
    description,
    requirements,
    responsibilities,
    employmentType,
    salary,
    applicationDeadline,
  } = req.body;

  try {
     // Fetch the company profile and assign it to req.user
   const companyProfile = await CompanyProfile.findOne({ user: req.user.id });
   if (!companyProfile) {
     console.error('Company profile not found for user:', req.user.id);
     return res.status(404).json({ msg: 'Company profile not found' });
   }

   req.user.CompanyProfile = companyProfile;
  
   // Retrieve the complete company profile
   const fullCompanyProfile = await CompanyProfile.findById(req.user.CompanyProfile._id);
   if (!fullCompanyProfile) {
     console.error('Full company profile not found for id:', req.user.CompanyProfile._id);
     return res.status(404).json({ msg: 'Full company profile not found' });
   }

    // Check if the job post belongs to the company
    const jobPost = await JobPost.findOne({
      _id: jobId,
      'company.id': fullCompanyProfile._id.toString(),
    });

    console.log('jobId', jobId); // Log the correct variable name
    if (!jobPost) {
      return res.status(404).json({ msg: 'Job post not found' });
    }

    // Update job post fields
    jobPost.title = title;
    jobPost.location = location;
    jobPost.description = description;
    jobPost.requirements = requirements;
    jobPost.responsibilities = responsibilities;
    jobPost.employmentType = employmentType;
    jobPost.salary = salary;
    jobPost.applicationDeadline = applicationDeadline;

    await jobPost.save();

    return res.json(jobPost);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};




  


  

// @route    GET api/v1/student/job
// @desc     Get all job posts for the company
// @access   Private
const getAllJobPosts = async (req, res) => {
  try {
    const companyProfile = await CompanyProfile.findOne({ user: req.user.id });
    if (!companyProfile) {
      console.error('Company profile not found for user:', req.user.id);
      return res.status(404).json({ msg: 'Company profile not found' });
    }

    const jobPosts = await JobPost.find({ 'company.id': companyProfile._id }).sort({
      datePosted: -1,
    });

    res.json(jobPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};



// @route    GET api/v1/student/job/:id
// @desc     Get a single job post by ID
// @access   Private
const getJobPostById = async (req, res) => {
    try {
      const jobPost = await JobPost.findById(req.params.id).populate('company', ['name']);
      
      if (!jobPost) {
        return res.status(404).json({ msg: 'Job post not found' });
      }
  
      res.json(jobPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };

// @route    PUT api/v1/student/job/:id/reject
// @desc     Reject an applicant for a job post
// @access   Private
const rejectApplicant = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);

    if (!jobPost) {
      return res.status(404).json({ msg: 'Job post not found' });
    }

    const companyProfile = await CompanyProfile.findOne({ user: req.user.id });
    if (!companyProfile) {
      console.error('Company profile not found for user:', req.user.id);
      return res.status(404).json({ msg: 'Company profile not found' });
    }

    // Check if the user is authorized to reject applicants
    if (!companyProfile || !jobPost.company || jobPost.company.toString() !== req.user.companyProfile.toString()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const { applicantId } = req.body;

    // Find the corresponding JobApplication
    const jobApplication = await JobApplication.findOne({
      user: applicantId,
      job: req.params.id,
    });

    if (!jobApplication) {
      return res.status(404).json({ msg: 'Job application not found' });
    }

    // Check if the applicant is shortlisted before rejecting
    if (jobApplication.status !== 'Shortlisted') {
      return res.status(400).json({ msg: 'Applicant not shortlisted' });
    }

    // Update the status in JobApplication
    jobApplication.status = 'Rejected'; // Make sure 'Rejected' is in the correct case
    await jobApplication.save();

    // Update the status in JobPost
    const applicantIndex = jobPost.applicants.findIndex(
      (app) => app.student.toString() === applicantId
    );

    if (applicantIndex !== -1) {
      jobPost.applicants[applicantIndex].status = 'Rejected'; // Make sure 'Rejected' is in the correct case
      await jobPost.save();
    }

    return res.json({ msg: 'Applicant rejected successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


  // @route    PUT api/v1/student/job/:id/hire
// @desc     Hire an applicant for a job post
// @access   Private
const hireApplicant = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);

    if (!jobPost) {
      return res.status(404).json({ msg: 'Job post not found' });
    }

    const companyProfile = await CompanyProfile.findOne({ user: req.user.id });
    if (!companyProfile) {
      console.error('Company profile not found for user:', req.user.id);
      return res.status(404).json({ msg: 'Company profile not found' });
    }

    // Check if the user is authorized to hire applicants
    if (!companyProfile || !jobPost.company) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const { applicantId } = req.body;

    // Find the corresponding JobApplication
    const jobApplication = await JobApplication.findOne({
      user: applicantId,
      job: req.params.id,
    });

    if (!jobApplication) {
      return res.status(404).json({ msg: 'Job application not found' });
    }

    // Check if the applicant is shortlisted before hiring
    if (jobApplication.status !== 'Shortlisted') {
      return res.status(400).json({ msg: 'Applicant not shortlisted' });
    }

    // Update the status in JobApplication
    jobApplication.status = 'Hired'; // Make sure 'Hired' is in the correct case
    await jobApplication.save();

    // Update the status in JobPost
    const applicantIndex = jobPost.applicants.findIndex(
      (app) => app.student.toString() === applicantId
    );

    if (applicantIndex !== -1) {
      jobPost.applicants[applicantIndex].status = 'Hired'; // Make sure 'Hired' is in the correct case
      await jobPost.save();
    }

    return res.json({ msg: 'Applicant hired successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @route    PUT api/job-posts/:id/shortlist
// @desc     Shortlist an applicant for a job post
// @access   Private
const shortlistApplicant = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);

    if (!jobPost) {
      return res.status(404).json({ msg: 'Job post not found' });
    }

    const companyProfile = await CompanyProfile.findOne({ user: req.user.id });
    if (!companyProfile) {
      console.error('Company profile not found for user:', req.user.id);
      return res.status(404).json({ msg: 'Company profile not found' });
    }

    // Check if the user is authorized to shortlist applicants
    if (!companyProfile || !jobPost.company) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const { applicantId } = req.body;

    // Find the corresponding JobApplication
    const jobApplication = await JobApplication.findOne({
      user: applicantId,
      job: req.params.id,
    });

    if (!jobApplication) {
      return res.status(404).json({ msg: 'Job application not found' });
    }

    // Update the status in JobApplication
    jobApplication.status = 'Shortlisted'; // Make sure 'Shortlisted' is in the correct case
    await jobApplication.save();

    // Update the status in JobPost
    const applicantIndex = jobPost.applicants.findIndex(
      (app) => app.student.toString() === applicantId
    );

    if (applicantIndex !== -1) {
      jobPost.applicants[applicantIndex].status = 'Shortlisted'; // Make sure 'Shortlisted' is in the correct case
      await jobPost.save();
    }

    return res.json({ msg: 'Applicant shortlisted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};






// @route    DELETE api/job-posts/:id
// @desc     Delete a job post
// @access   Private
const deleteJobPost = async (req, res) => {
    try {
      const jobPost = await JobPost.findById(req.params.id);
  
      if (!jobPost) {
        return res.status(404).json({ msg: 'Job post not found' });
      }
  
      // Check if the user is authorized to delete the job post
      if (jobPost.company.toString() !== req.user.CompanyProfile.toString()) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }
  
      await jobPost.remove();
  
      return res.json({ msg: 'Job post deleted' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  


module.exports = {
  createJobPost,
  getAllJobPosts,
  shortlistApplicant,
  getJobPostById,
  deleteJobPost,
  rejectApplicant,
  hireApplicant,
  updateJobPost
};

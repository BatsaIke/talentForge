const JobApplication = require('../models/JobApplication');
const StudentProfile = require('../models/StudentProfile');
const JobPost = require('../models/jobPost');

const applyForJob = async (req, res) => {
    const { jobId } = req.params;
  
    try {
      // Check if the user has a profile
      const profile = await StudentProfile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: 'User profile not found' });
      }
  
      // Check if the job post exists
      const jobPost = await JobPost.findById(jobId);
      if (!jobPost) {
        return res.status(404).json({ msg: 'Job post not found' });
      }
  
      // Check if the applicant already applied
      if (jobPost.applicants.some((app) => app.student.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Applicant already applied for this job' });
      }
  
      // Add the applicant to the job post with the appropriate status
      jobPost.applicants.push({ student: req.user.id, status: 'Applied' }); // Use 'Applied' instead of 'applied'
      await jobPost.save();
  
      res.json({ msg: 'Application submitted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  
  
  
  

  

  const getUserApplications = async (req, res) => {
    try {
      // Retrieve job applications for the current user
      const applications = await JobApplication.find({ user: req.user.id })
        .populate({
          path: 'job',
          select: ['title', 'location'],
        })
        .select(['job', 'status']) // Select only the 'job' and 'status' fields
        .lean();
  
      res.json(applications);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  
  
  
  
module.exports = { applyForJob, getUserApplications };

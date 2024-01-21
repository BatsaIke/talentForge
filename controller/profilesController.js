const config = require('config');
const {  validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const axios = require('axios')
const Profile = require('../models/StudentProfile');
const User = require('../models/User');
const Post = require('../models/Post');

//@route GET api/v1/profiles/me
//@desc Get current user's profile
//access private
const getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "role", "avatar"]
    );

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found for this user" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};


//@rout POST api/v1/profile
//@desc create or update user's profile
//access private
const createUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedIn,
    experience,
    education,
    projects,
    certificates,
    ...rest
  } = req.body;

  // Build profile object
  const profileFields = {
    user: req.user.id,
    company,
    website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
    location,
    bio,
    status,
    githubusername,
    skills: Array.isArray(skills) ? skills : skills.split(',').map((skill) => skill.trim()),
    ...rest,
  };

  // Normalize social fields
  const socialFields = { youtube, twitter, instagram, linkedIn, facebook };
  Object.keys(socialFields).forEach((key) => {
    if (socialFields[key]) {
      socialFields[key] = normalize(socialFields[key], { forceHttps: true });
    }
  });
  profileFields.social = socialFields;

  // Build experience array
  if (experience) {
    profileFields.experience = experience.map((exp) => ({
      title: exp.title,
      company: exp.company,
      location: exp.location,
      from: exp.from,
      to: exp.to,
      current: exp.current,
      description: exp.description,
    }));
  }

  // Build education array
  if (education) {
    profileFields.education = education.map((edu) => ({
      school: edu.school,
      degree: edu.degree,
      fieldofstudy: edu.fieldofstudy,
      from: edu.from,
      to: edu.to,
      current: edu.current,
      description: edu.description,
    }));
  }

  // Build projects array
  if (projects) {
    profileFields.projects = projects.map((proj) => ({
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies,
      link: proj.link,
    }));
  }

  // Build certificates array
  if (certificates) {
    profileFields.certificates = certificates.map((cert) => ({
      certUrl: cert.certUrl,
      cvUrl: cert.cvUrl,
      coverLetterUrl: cert.coverLetterUrl,
    }));
  }

  try {
    // Find the profile
    let profile = await Profile.findOne({ user: req.user.id });

    // If it exists, update it
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    } else {
      // If it doesn't exist, create it
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};




// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
const getSingleProfile = (async ({ params: { user_id } }, res) => {
  try {
    const profile = await Profile.findOne({
      user: user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});


//@rout DELETE api/v1/profile/
//@desc delete a profile, user and post
//access private
const deleteAProfile = async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });

    // Find and remove user profile
    const profile = await Profile.findOneAndRemove({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Find and remove user
    const user = await User.findOneAndRemove({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User and profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


//@rout PUT api/profile/experince
//@desc adds profile experince
//access private
const updateAProfileExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Assuming req.body represents the new experience data
    const { id, ...experienceData } = req.body;

    // Check if an experience with the same ID exists
    const existingExperienceIndex = profile.experience.findIndex(
      (exp) => exp._id.toString() === id
    );

    if (existingExperienceIndex !== -1) {
      // Update the existing experience
      profile.experience[existingExperienceIndex] = {
        ...profile.experience[existingExperienceIndex],
        ...experienceData,
      };
    } else {
      // Add a new experience to the beginning of the array
      profile.experience.unshift(experienceData);
    }
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

//@rout DELETE api/v1/profile/experince/:exp_id
//@desc delete a profile, experince
//access private

const deleteAProfileExperience = async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};



//@rout PUT api/profile/education
//@desc adds profile education
//access private
const updateAProfileEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Find the index of the education entry to be updated
    const eduIndex = profile.education.findIndex(
      (edu) => edu._id.toString() === req.params.edu_id
    );
    // Check if the education entry with the specified ID exists
    if (eduIndex === -1) {
      return res.status(404).json({ msg: 'Education entry not found' });
    }
    // Update the specific education entry
    profile.education[eduIndex] = req.body;
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};


//@rout DELETE api/profile/education/:edu_id
//@desc delete a profile, education
//access private
const deleteAProfileEducation = async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
  
    // Check if the education entry with the specified ID exists
    const eduToRemove = foundProfile.education.find(
      (edu) => edu._id.toString() === req.params.edu_id
    );
  
    if (!eduToRemove) {
      return res.status(404).json({ msg: 'Education entry not found' });
    }
  
    // Remove the education entry from the array
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
  
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
}

//@rout GET api/profile/github/:username
//@desc get user repos from github
//access public
const getGithubRepo = async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`
    };
    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

//@route PUT api/profile/project/:proj_id
//@desc Update a profile project
//access private
const updateAProfileProject = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {
        user: req.user.id,
        'projects._id': req.params.proj_id
      },
      {
        $set: {
          'projects.$.title': req.body.title,
          'projects.$.description': req.body.description,
          'projects.$.technologies': req.body.technologies,
          'projects.$.link': req.body.link
        }
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ msg: "Profile or project not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};


//@route DELETE api/profile/project/:proj_id
//@desc Delete a profile project
//access private
const deleteAProfileProject = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { projects: { _id: req.params.proj_id } } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    if (profile.projects.length === 0) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};


//@route PUT api/profile/certificate/:cert_id
//@desc Update a profile certificate
//access private
const updateAProfileCertificate = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { 
        user: req.user.id,
        "certificates._id": req.params.cert_id 
      },
      { 
        $set: {
          "certificates.$.certUrl": req.body.certUrl || "",
          "certificates.$.cvUrl": req.body.cvUrl || "",
          "certificates.$.coverLetterUrl": req.body.coverLetterUrl || ""
        }
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ msg: "Profile or Certificate not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

//@route DELETE api/profile/certificate/:cert_id
//@desc Delete a profile certificate
//access private
const deleteAProfileCertificate = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { certificates: { _id: req.params.cert_id } } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ msg: "Profile or Certificate not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports = {
  getUserProfile,
  createUserProfile,
  getAllProfiles,
  getSingleProfile,
  deleteAProfile,
  updateAProfileExperience,
  deleteAProfileExperience,
  updateAProfileEducation,
  deleteAProfileEducation,
  getGithubRepo,
  updateAProfileExperience,
  deleteAProfileProject,
  updateAProfileProject,
  updateAProfileCertificate,
  deleteAProfileCertificate
};

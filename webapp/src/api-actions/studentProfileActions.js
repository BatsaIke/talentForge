import Toast from 'react-native-toast-message';
import {
  getProfile,
  resetProfile,
  setLoading,
  getProfiles,
  updateProfile,
  getRepos,
} from '../redux/profileSlice.js';
import apiErrorHandler from '../../utils/apiErrorHandler.js';
import api from './api.js';

export const getCurrentProfile = () => async dispatch => {
 await dispatch(setLoading(true));
  try {
    const res = await api.get('/profile/me');
    await dispatch(getProfile(res.data));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

//get all profiles
export const get_Profiles = () => async dispatch => {
  await dispatch(resetProfile());
  await dispatch(setLoading(true));
  try {
    const res = await api.get('/profile');
    await dispatch(getProfiles(res.data));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

//get github repos
export const getGithubRepos = username => async dispatch => {
 await dispatch(setLoading(true));
  try {
    const res = await api.get(`/profile/github/${username}`);
   await dispatch(getRepos(res.data));
   await dispatch(setLoading(false));
  } catch (error) {
  await  apiErrorHandler(dispatch, error);
  }
};

//get all profile by id

export const getProfileById = (userID) => async (dispatch) => {
  await dispatch(setLoading(true));
  try {
    const res = await api.get(`/profile/user/${userID}`);
    await dispatch(getProfile(res.data)); 
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};


//create or update profile
export const createProfile =
  (formData, edit = false) =>
  async dispatch => {
    console.log('creating profile called');
    try {
      const res = await api.post('/profile', formData);
    await  dispatch(getProfile(res.data));
      console.log(res, 'and profile was created successfully');
      Toast.show(
        edit
          ? {
              type: 'success',
              text1: 'Success',
              text2: 'Profile Updated',
            }
          : {
              type: 'success',
              text1: 'Success',
              text2: 'Profile Created',
            },
      );
    await  dispatch(setLoading(false));
    } catch (error) {
      apiErrorHandler(dispatch, error);
    }
  };

//add experience
export const addExperience = formData => async dispatch => {
   dispatch(setLoading(true))
  try {
    const res = await api.put('/profile/experience', formData);
    await dispatch(updateProfile(res.data));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

//add experience
export const addEducation = formData => async dispatch => {
  // dispatch(setLoading(true))

  try {
    const res = await api.put('/profile/education', formData);
    await dispatch(updateProfile(res.data));

    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

//delete experience
export const deleteExperience = id => async dispatch => {
  await dispatch(setLoading(true));
  try {
    const res = await api.delete(`/profile/experience/${id}`);
   await dispatch(updateProfile(res.data));
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'education added successfully',
    });
  await  dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

//delete education
export const deleteEducation = id => async dispatch => {
 await dispatch(setLoading(true));

  try {
    const res = await api.delete(`/profile/education/${id}`);
    await dispatch(updateProfile(res.data));
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'education deleted successfully',
    });
   await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

//delete projects
export const deleteProjects = id => async dispatch => {
  await dispatch(setLoading(true));
 
   try {
     const res = await api.delete(`/profile/projects/${id}`);
     await dispatch(updateProfile(res.data));
     Toast.show({
       type: 'success',
       text1: 'Success',
       text2: 'education deleted successfully',
     });
    await dispatch(setLoading(false));
   } catch (error) {
     apiErrorHandler(dispatch, error);
   }
 };

 //delete certificates
export const deleteCetificates= id => async dispatch => {
  await dispatch(setLoading(true));
 
   try {
     const res = await api.delete(`/profile/certificates/${id}`);
     await dispatch(updateProfile(res.data));
     Toast.show({
       type: 'success',
       text1: 'Success',
       text2: 'education deleted successfully',
     });
    await dispatch(setLoading(false));
   } catch (error) {
     apiErrorHandler(dispatch, error);
   }
 };

 certificates
//delete account and profilce
export const deleteAccount = id => async dispatch => {
 await dispatch(setLoading(true));
  try {
    await api.delete(`/api/v1/profile`);
  await  dispatch(updateProfile(res.data));
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'account deleted successfully',
    });
   await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

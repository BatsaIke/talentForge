
// src/actions/auth.js
import apiErrorHandler from '@/utils/apiErrorHandler';
import api from './api';
import setAuthToken from '@/utils/setAuthToken';
import { setLoading, setToken, setUser } from '@/redux/slices/authSlice';
import { set_Alert } from './alertAction';


export const loadUser = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    // Make the API request to fetch user data
    const response = await api.get('/auth');
    const userData = response.data;
    console.log(userData, 'USER');
    dispatch(setUser(userData));
    dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

export const register = formData => async dispatch => {
  try {
    // Make a POST request to the '/users' endpoint with the provided formData
    const res = await api.post('/users', formData);
    console.log('Response:', res.data);
    const userData = res.data;
  } catch (error) {
    // Call the apiErrorHandler function to handle and display the error
    apiErrorHandler(dispatch, error);
  }
};

export const signin = (formData) => async (dispatch) => {
    await dispatch(setLoading(true));
    try {
      const res = await api.post('/auth', formData);
      console.log('api call', res);
      const token = res.data.token;
      await dispatch(setToken(token));
      await setAuthToken(token);
      await dispatch(loadUser());
      await dispatch(setLoading(false));
    } catch (error) {
      apiErrorHandler(dispatch, error);
      await dispatch(setLoading(false)); 
    }
  };
  
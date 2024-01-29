

// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import alertSlice from './slices/alertSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  alerts:alertSlice
});

export default rootReducer;

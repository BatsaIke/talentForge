'use client'
import { configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Import the thunk function directly
import rootReducer from './rootReducer';



const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false, 
    });

    return middleware.concat( thunk);
  },
});



export default store;

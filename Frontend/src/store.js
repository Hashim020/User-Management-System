import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice'
import { apiSlice } from './slices/apiSlice';
import adminAuthSlice from './slices/adminAuthSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    adminAuth:adminAuthSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
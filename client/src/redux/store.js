import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/bookReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
  },
});

export default store;
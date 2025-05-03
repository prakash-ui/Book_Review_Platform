import { login, register, getCurrentUser } from '../../services/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const LOAD_USER = 'LOAD_USER';

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await login(credentials);
    localStorage.setItem('token', response.data.token);
    dispatch(loadUserFromToken());
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await register(user);
    localStorage.setItem('token', response.data.token);
    dispatch(loadUserFromToken());
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const loadUserFromToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await getCurrentUser();
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

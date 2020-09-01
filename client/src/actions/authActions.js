import {
  LOGIN_SUCCESS,
  IS_ADMIN,
  LOGIN_ERROR,
  USER_LOADED,
  LOADING,
  IS_AUTHENTICATED,
  REDIRECT_ON_LOGIN,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT,
} from '../actions/types';

import { publicFetch } from '../utils/publicFetch';
import { authAxios } from '../utils/authFetch';

export const signupValidation = (credentials) => async (dispatch) => {
  try {
    setLoading();
    const { data } = await publicFetch.post('auth/signup', credentials);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      return {
        type: REDIRECT_ON_LOGIN,
      };
    }, 700);
  } catch (err) {
    setLoading();
    dispatch({
      type: SIGNUP_ERROR,
      payload: err.data.message,
    });
  }
};

export const isAdmin = () => {
  return {
    type: IS_ADMIN,
  };
};

export const isUserAuthenticated = () => {
  return {
    type: IS_AUTHENTICATED,
  };
};
export const loginValidation = (credentials) => async (dispatch) => {
  const { data } = await publicFetch.post('auth/login', credentials);
  try {
    setLoading();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: REDIRECT_ON_LOGIN,
      });
    }, 700);
  } catch (error) {
    setLoading();
    dispatch({
      type: LOGIN_ERROR,
      payload: error.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  // const { data } = await authAxios.post('auth/logout');
  dispatch({
    type: LOGOUT,
  });
};

export const setAuthInfo = () => async (dispatch) => {
  const { data } = await authAxios.get('/users/me');
  dispatch({
    type: USER_LOADED,
    payload: data,
  });
};

const setLoading = () => {
  return {
    type: LOADING,
  };
};

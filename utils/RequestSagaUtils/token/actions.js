import {
  ACTION_UPDATE_ACCESS_TOKEN,
  ACTION_PREPARE_ACCESS_TOKEN,
  ACTION_PREPARE_ACCESS_TOKEN_SUCCESS,
  ACTION_PREPARE_ACCESS_TOKEN_ERROR,
  ACTION_UPDATE_REFRESH_TOKEN,
  ACTION_REMOVE_ACCESS_TOKEN,
  ACTION_REMOVE_REFRESH_TOKEN,
  ACTION_SET_ANONYMOUS_TOKEN,
  ACTION_UNSET_ANONYMOUS_TOKEN
} from '../constants';

export const prepareAccessToken = () => ({ type: ACTION_PREPARE_ACCESS_TOKEN });

export const prepareAccessTokenSuccess = ({ token }) => ({
  type: ACTION_PREPARE_ACCESS_TOKEN_SUCCESS,
  payload: {
    token
  }
});

export const prepareAccessTokenError = () => ({
  type: ACTION_PREPARE_ACCESS_TOKEN_ERROR
});

export const updateAccessToken = ({ token }) => ({
  type: ACTION_UPDATE_ACCESS_TOKEN,
  payload: {
    token
  }
});

export const removeAccessToken = () => ({ type: ACTION_REMOVE_ACCESS_TOKEN });

export const updateRefreshToken = ({ refreshToken }) => ({
  type: ACTION_UPDATE_REFRESH_TOKEN,
  payload: {
    refreshToken
  }
});

export const removeRefreshToken = () => ({ type: ACTION_REMOVE_REFRESH_TOKEN });

export const setAnonymousToken = ({ token }) => ({
  type: ACTION_SET_ANONYMOUS_TOKEN,
  payload: {
    anonymousToken: token
  }
});

export const unsetAnonymousToken = () => ({
  type: ACTION_UNSET_ANONYMOUS_TOKEN
});

import {
  ACTION_REFRESH_ACCESS_TOKEN,
  ACTION_REFRESH_ACCESS_TOKEN_ERROR,
  ACTION_REFRESH_ACCESS_TOKEN_SUCCESS
} from '../constants';

export const refreshAccessToken = ({ refreshToken }) => ({
  type: ACTION_REFRESH_ACCESS_TOKEN,
  args: [
    {
      refreshToken
    }
  ]
});

export const refreshAccessTokenSuccess = ({ token, refreshToken }) => ({
  type: ACTION_REFRESH_ACCESS_TOKEN_SUCCESS,
  payload: {
    token,
    refreshToken
  }
});

export const refreshAccessTokenError = () => ({
  type: ACTION_REFRESH_ACCESS_TOKEN_ERROR
});

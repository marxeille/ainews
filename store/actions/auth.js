import {
  ACTION_LOGIN,
  ACTION_REGISTER_WITH_PHONE,
  ACTION_VERIFY_WITH_PHONE,
  ACTION_UPDATE_REGISTER_INFO,
  ACTION_LOGIN_WITH_FACEBOOK,
  REQUEST_LOGIN_ANONYMOUSLY,
  ACTION_LOGOUT,
  REQUEST_FORGOT_PASSWORD
} from '../constants';

export const loginAnonymously = callback => ({
  type: REQUEST_LOGIN_ANONYMOUSLY,
  args: [callback]
});

export const loginWithPhone = ({ phone, password }, callback) => ({
  type: ACTION_LOGIN,
  args: [
    {
      phone,
      password
    },
    callback
  ]
});

export const loginWithFacebook = (
  { accessToken, followingCategoryIds },
  callback
) => ({
  type: ACTION_LOGIN_WITH_FACEBOOK,
  args: [
    {
      accessToken,
      followingCategoryIds
    },
    callback
  ]
});

export const registerWithPhone = ({ phone }, callback) => ({
  type: ACTION_REGISTER_WITH_PHONE,
  args: [
    {
      phone
    },
    callback
  ]
});

export const verifyWithPhone = ({ phone, otp }, callback) => ({
  type: ACTION_VERIFY_WITH_PHONE,
  args: [
    {
      phone,
      otp
    },
    callback
  ]
});

export const updateRegisterInfo = (
  { accessToken, fullName, password, followingCategoryIds },
  callback
) => ({
  type: ACTION_UPDATE_REGISTER_INFO,
  args: [
    {
      accessToken,
      fullName,
      password,
      followingCategoryIds
    },
    callback
  ]
});

export const logout = () => ({
  type: ACTION_LOGOUT
});


export const forgotPassword = ({ accessToken, newPassword }, callback) => ({
  type: REQUEST_FORGOT_PASSWORD,
  args: [
    {
      accessToken,
      newPassword
    },
    callback
  ]
});

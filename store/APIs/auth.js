import { API_V2 } from '.';

export default {
  loginAnonymously: () => API_V2.post('auth/anonymous/token'),
  login: ({ phone, password }) =>
    API_V2.post('auth/phone/login', {
      phone,
      password
    }),
  loginWithFacebook: ({ accessToken, followingCategoryIds }) =>
    API_V2.post('auth/facebook/login', {
      accessToken,
      followingCategoryIds
    }),
  registerWithPhone: ({ phone }) =>
    API_V2.post('auth/phone/register', {
      phone
    }),
  verifyWithPhone: ({ phone, otp }) =>
    API_V2.post('auth/phone/register', {
      phone,
      otp
    }),
  updateRegisterInfo: ({
    accessToken,
    password,
    fullName,
    followingCategoryIds
  }) =>
    API_V2.post('auth/facebook-kit/register', {
      accessToken,
      password,
      fullName,
      followingCategoryIds
    }),
  forgotPassword: ({ accessToken, newPassword }) =>
    API_V2.post('auth/forgot-password', { accessToken, newPassword })
};

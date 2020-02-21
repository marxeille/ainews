import { all, takeLatest } from 'redux-saga/effects';
import { me } from 'AINews/src/store/actions/user';
import {
  ACTION_LOGIN,
  ACTION_REGISTER_WITH_PHONE,
  ACTION_VERIFY_WITH_PHONE,
  ACTION_UPDATE_REGISTER_INFO,
  ACTION_LOGIN_WITH_FACEBOOK,
  REQUEST_LOGIN_ANONYMOUSLY,
  REQUEST_FORGOT_PASSWORD
} from '../constants';
import { createRequestSaga } from '../../utils/RequestSagaUtils';
import AuthAPIs from '../APIs/auth';
import {
  updateAccessToken,
  updateRefreshToken,
  setAnonymousToken
} from '../../utils/RequestSagaUtils/token/actions';


const requestLoginAnonymously = createRequestSaga({
  request: AuthAPIs.loginAnonymously,
  key: REQUEST_LOGIN_ANONYMOUSLY,
  onSuccessActionCreators: [setAnonymousToken]
});

const requestLogin = createRequestSaga({
  request: AuthAPIs.login,
  key: ACTION_LOGIN,
  onSuccessActionCreators: [updateAccessToken, updateRefreshToken, me]
});

const requestLoginWithFacebook = createRequestSaga({
  request: AuthAPIs.loginWithFacebook,
  key: ACTION_LOGIN_WITH_FACEBOOK,
  onSuccessActionCreators: [updateAccessToken, updateRefreshToken, me]
});

const requestRegisterWithPhone = createRequestSaga({
  request: AuthAPIs.registerWithPhone,
  key: ACTION_REGISTER_WITH_PHONE
});

const requestVerifyWithPhone = createRequestSaga({
  request: AuthAPIs.verifyWithPhone,
  key: ACTION_VERIFY_WITH_PHONE
});

const requestUpdateRegisterInfo = createRequestSaga({
  request: AuthAPIs.updateRegisterInfo,
  key: ACTION_UPDATE_REGISTER_INFO,
  onSuccessActionCreators: [updateAccessToken, updateRefreshToken, me]
});

const requestForgotPassword = createRequestSaga({
  request: AuthAPIs.forgotPassword,
  key: REQUEST_FORGOT_PASSWORD,
  tokenRequired: 'non_required'
})

export default function* authSaga () {
  yield all([
    takeLatest(REQUEST_LOGIN_ANONYMOUSLY, requestLoginAnonymously),
    takeLatest(ACTION_LOGIN, requestLogin),
    takeLatest(ACTION_LOGIN_WITH_FACEBOOK, requestLoginWithFacebook),
    takeLatest(ACTION_REGISTER_WITH_PHONE, requestRegisterWithPhone),
    takeLatest(ACTION_VERIFY_WITH_PHONE, requestVerifyWithPhone),
    takeLatest(ACTION_UPDATE_REGISTER_INFO, requestUpdateRegisterInfo),
    takeLatest(REQUEST_FORGOT_PASSWORD, requestForgotPassword)
  ]);
}

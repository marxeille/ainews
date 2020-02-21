import {
  select, all, put, take, race, takeLatest
} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import * as AuthActions from '../auth/actions';
import * as TokenActions from './actions';
import {
  ACTION_PREPARE_ACCESS_TOKEN,
  ACTION_REFRESH_ACCESS_TOKEN_ERROR,
  ACTION_REFRESH_ACCESS_TOKEN_SUCCESS
} from '../constants';

function* tryAnonymousToken() {
  yield put(TokenActions.removeAccessToken());
  yield put(TokenActions.removeRefreshToken());
  const { anonymousToken } = yield select(_ => _.token);
  if (!anonymousToken) {
    yield put(TokenActions.prepareAccessTokenError());
  } else {
    yield put(
      TokenActions.prepareAccessTokenSuccess({ token: anonymousToken })
    );
  }
}

function* requestPrepareAccessToken() {
  let { token } = yield select(_ => _.token);

  let shouldRefreshToken = true;

  if (token) {
    const now = Date.now() / 1000;
    const result = jwtDecode(token);
    const { exp } = result;
    if (now <= exp) {
      shouldRefreshToken = false;
    }
  }

  if (!shouldRefreshToken) {
    yield put(TokenActions.prepareAccessTokenSuccess({ token }));
  } else {
    let { refreshToken } = yield select(_ => _.token);
    if (!refreshToken) {
      yield tryAnonymousToken();
    } else {
      yield put(AuthActions.refreshAccessToken({ refreshToken }));

      const loginRaceOptions = {
        takeSuccess: take(ACTION_REFRESH_ACCESS_TOKEN_SUCCESS),
        takeError: take(ACTION_REFRESH_ACCESS_TOKEN_ERROR)
      };

      const { takeSuccess } = yield race(loginRaceOptions);
      if (takeSuccess) {
        // eslint-disable-next-line prefer-destructuring
        token = takeSuccess.payload.token;
        // eslint-disable-next-line prefer-destructuring
        refreshToken = takeSuccess.payload.refreshToken;

        yield put(TokenActions.updateAccessToken({ token }));
        yield put(TokenActions.updateRefreshToken({ refreshToken }));
        yield put(TokenActions.prepareAccessTokenSuccess({ token }));
      } else {
        yield tryAnonymousToken();
      }
    }
  }
}

export default function* tokenSaga() {
  yield all([
    takeLatest(ACTION_PREPARE_ACCESS_TOKEN, requestPrepareAccessToken)
  ]);
}

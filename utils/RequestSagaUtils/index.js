import { all } from 'redux-saga/effects';
import { createRequestSaga } from './RequestSagaCreator';
import authSaga from './auth/saga';
import tokenSaga from './token/saga';
import tokenReducer from './token/reducer';
import { getAccessToken } from './token/selectors';

function* requestUtilsSaga() {
  yield all([authSaga(), tokenSaga()]);
}

export {
  createRequestSaga, requestUtilsSaga, tokenReducer, getAccessToken
};

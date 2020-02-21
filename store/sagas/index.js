import { all } from 'redux-saga/effects';
import { requestUtilsSaga } from '../../utils/RequestSagaUtils';

import authSaga from './auth';
import authorsSaga from './authors';
import postsSaga from './posts';
import suggestionsSaga from './suggestions';
import userSaga from './user';
import categoriesSaga from './categories';
import commentsSaga from './comments';
import searchSaga from './search';
import notificationSaga from './notification';
import reportSaga from './report';

function* rootSaga() {
  yield all([
    authSaga(),
    authorsSaga(),
    categoriesSaga(),
    postsSaga(),
    suggestionsSaga(),
    userSaga(),
    requestUtilsSaga(),
    commentsSaga(),
    searchSaga(),
    notificationSaga(),
    reportSaga()
  ]);
}

export default rootSaga;

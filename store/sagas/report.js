import { all, takeLatest } from 'redux-saga/effects';
import { saveReports } from 'AINews/src/store/actions/report';
import { ACTION_GET_REPORTS } from '../constants';
import CategoriesAPIs from '../APIs/report';
import { createRequestSaga } from '../../utils/RequestSagaUtils';

const requestReports = createRequestSaga({
  request: CategoriesAPIs.getReports,
  key: ACTION_GET_REPORTS,
  tokenRequired: 'required',
  onSuccessActionCreators: [saveReports]
});

export default function* categoriesSaga() {
  yield all([takeLatest(ACTION_GET_REPORTS, requestReports)]);
}

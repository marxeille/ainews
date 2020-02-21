import { all, takeLatest } from 'redux-saga/effects';
import { REQUEST_GET_NOTIFICATION } from '../constants';
import NotificationAPIs from '../APIs/notification';
import { createRequestSaga } from '../../utils/RequestSagaUtils';

const requestGetNotification = createRequestSaga({
  key: REQUEST_GET_NOTIFICATION,
  request: NotificationAPIs.getNotifications,
  tokenRequired: 'required'
});

export default function* postsSaga() {
  yield all([takeLatest(REQUEST_GET_NOTIFICATION, requestGetNotification)]);
}

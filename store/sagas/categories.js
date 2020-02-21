import { all, takeLatest } from 'redux-saga/effects';
import { syncCategories } from 'AINews/src/store/actions/categories';
import {
  ACTION_GET_CATEGORIES,
  ACTION_GET_CATEGORIES_WITHOUT_SYNC
} from '../constants';
import CategoriesAPIs from '../APIs/categories';
import { createRequestSaga } from '../../utils/RequestSagaUtils';

const requestGetCategories = createRequestSaga({
  request: CategoriesAPIs.getCategories,
  key: ACTION_GET_CATEGORIES,
  tokenRequired: 'required',
  onSuccessActionCreators: [syncCategories]
});

const requestGetCategoriesWithoutSync = createRequestSaga({
  request: CategoriesAPIs.getCategories,
  KEY: ACTION_GET_CATEGORIES_WITHOUT_SYNC,
  tokenRequired: 'required'
});

export default function* categoriesSaga() {
  yield all([
    takeLatest(ACTION_GET_CATEGORIES, requestGetCategories),
    takeLatest(
      ACTION_GET_CATEGORIES_WITHOUT_SYNC,
      requestGetCategoriesWithoutSync
    )
  ]);
}

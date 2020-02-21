import {
  all, takeEvery, put, select
} from 'redux-saga/effects';
import { ACTION_SEARCH_SAVE_KEYWORD, ACTION_SEARCH_REPLACE } from '../constants';

function* saveKeyword(action) {
  try {
    const { payload } = action;
    const { keyword } = payload;

    const savedKeyword = yield select(state => state.searchReducer.savedKeyword);
    // filter existed keyword
    const filteredKeyword = savedKeyword.filter(i => i !== keyword);
    // save current keyword and fix length to 10
    const newSavedKeyword = [keyword, ...filteredKeyword].slice(0, 10);
    // save to reducer
    yield put({
      type: ACTION_SEARCH_REPLACE,
      payload: {
        savedKeyword: newSavedKeyword
      }
    })
  } catch (error) {
    // console.log('error', error);
  }
}

export default function* searchSaga() {
  yield all([
    takeEvery(ACTION_SEARCH_SAVE_KEYWORD, saveKeyword)
  ]);
}

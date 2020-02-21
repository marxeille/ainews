import { all, takeLatest } from 'redux-saga/effects';

import SuggestionAPIs from '../APIs/suggestions';
import { ACTION_GET_SUGGESTIONS } from '../constants';
import { createRequestSaga } from '../../utils/RequestSagaUtils';

const requestGetSuggestions = createRequestSaga({
  request: SuggestionAPIs.getSuggestions,
  key: ACTION_GET_SUGGESTIONS
});

export default function* suggestionsSaga() {
  yield all([takeLatest(ACTION_GET_SUGGESTIONS, requestGetSuggestions)]);
}

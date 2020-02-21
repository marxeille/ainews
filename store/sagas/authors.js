import { all, takeLatest } from 'redux-saga/effects';
import { saveFollowingAuthors } from 'AINews/src/store/actions/authors';
import { createRequestSaga } from '../../utils/RequestSagaUtils';

import AuthorAPIs from '../APIs/authors';
import {
  ACTION_GET_AUTHOR_SUGGESTIONS,
  ACTION_GET_FOLLOWED_AUTHORS,
  ACTION_GET_AUTHOR_PROFILE
} from '../constants';

const requestGetAuthorSuggestions = createRequestSaga({
  request: AuthorAPIs.getAuthorSuggestions,
  key: ACTION_GET_AUTHOR_SUGGESTIONS,
  tokenRequired: 'required'
});

const requestGetFollowedAuthors = createRequestSaga({
  request: AuthorAPIs.getFollowedAuthors,
  key: ACTION_GET_FOLLOWED_AUTHORS,
  tokenRequired: 'required',
  onSuccessActionCreators: [saveFollowingAuthors]
});

const requestGetAuthorProfile = createRequestSaga({
  request: AuthorAPIs.getAuthorProfile,
  key: ACTION_GET_AUTHOR_PROFILE,
  tokenRequired: 'required'
});

export default function* authorsSaga() {
  yield all([
    takeLatest(ACTION_GET_AUTHOR_SUGGESTIONS, requestGetAuthorSuggestions),
    takeLatest(ACTION_GET_FOLLOWED_AUTHORS, requestGetFollowedAuthors),
    takeLatest(ACTION_GET_AUTHOR_PROFILE, requestGetAuthorProfile)
  ]);
}

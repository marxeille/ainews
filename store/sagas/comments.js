import { all, takeEvery, select } from 'redux-saga/effects';
import {
  REQUEST_GET_SUB_COMMENTS,
  REQUEST_GET_NEWEST_COMMENTS,
  REQUEST_GET_TOP_COMMENTS
} from '../constants';
import CommentsAPIs from '../APIs/comments';
import { createRequestSaga } from '../../utils/RequestSagaUtils';
import { saveComments } from '../actions/comments';

function* requestGetNewestComments(action) {
  const {
    args: [{ postId }]
  } = action;

  const { authorId } = yield select(_ => _.posts[postId]);

  yield createRequestSaga({
    request: CommentsAPIs.getNewestComments,
    key: REQUEST_GET_NEWEST_COMMENTS,
    onSuccessActionCreators: [saveComments],
    tokenRequired: 'true'
  })({
    ...action,
    args: [
      {
        ...action.args[0],
        authorId
      },
      ...action.args.slice(1)
    ]
  });
}

function* requestGetTopComments(action) {
  const {
    args: [{ postId }]
  } = action;

  const { authorId } = yield select(_ => _.posts[postId] || '');

  yield createRequestSaga({
    request: CommentsAPIs.getTopComments,
    key: REQUEST_GET_TOP_COMMENTS,
    onSuccessActionCreators: [saveComments],
    tokenRequired: 'required'
  })({
    ...action,
    args: [
      {
        ...action.args[0],
        authorId
      },
      ...action.args.slice(1)
    ]
  });
}

function* requestGetSubComments(action) {
  const {
    args: [{ commentId }]
  } = action;

  const { authorId } = yield select(_ => _.comments[commentId]);

  yield createRequestSaga({
    request: CommentsAPIs.getSubComments,
    key: args => `${REQUEST_GET_SUB_COMMENTS}/${JSON.stringify(args)}`,
    onSuccessActionCreators: [saveComments],
    tokenRequired: 'required'
  })({
    ...action,
    args: [
      {
        ...action.args[0],
        authorId
      },
      ...action.args.slice(1)
    ]
  });
}

export default function* commentsSaga() {
  yield all([
    takeEvery(REQUEST_GET_NEWEST_COMMENTS, requestGetNewestComments),
    takeEvery(REQUEST_GET_TOP_COMMENTS, requestGetTopComments),
    takeEvery(REQUEST_GET_SUB_COMMENTS, requestGetSubComments)
  ]);
}

import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  ACTION_GET_POSTS,
  ACTION_GET_POST_DETAILS,
  ACTION_GET_POSTS_BY_AUTHOR,
  ACTION_GET_POSTS_BY_GROUP,
  ACTION_GET_GROUPS,
  ACTION_GET_NEXT_POST,
  ACTION_GET_RELATED_POSTS
} from '../constants';
import PostAPIs from '../APIs/posts';
import { createRequestSaga } from '../../utils/RequestSagaUtils';
import { saveAuthors } from '../actions/authors';
import { savePosts, savePost } from '../actions/posts';

const requestGetPosts = createRequestSaga({
  key: args => `${ACTION_GET_POSTS}_${JSON.stringify(args)}`,
  request: PostAPIs.getPosts,
  onSuccessActionCreators: [savePosts, saveAuthors],
  tokenRequired: 'required'
});

const requestGetRelatedPosts = createRequestSaga({
  key: args => `${ACTION_GET_RELATED_POSTS}_${JSON.stringify(args)}`,
  request: PostAPIs.getRelatedPosts,
  tokenRequired: 'required'
});

const requestGetPostsByAuthor = createRequestSaga({
  key: args => `${ACTION_GET_POSTS_BY_AUTHOR}_${JSON.stringify(args)}`,
  request: PostAPIs.getPostsByAuthor,
  onSuccessActionCreators: [savePosts],
  tokenRequired: 'required'
});

const requestGetPostsByGroup = createRequestSaga({
  key: args => `${ACTION_GET_POSTS_BY_GROUP}_${JSON.stringify(args)}`,
  request: PostAPIs.getPostsByGroup,
  onSuccessActionCreators: [savePosts, saveAuthors],
  tokenRequired: 'required'
});

const requestGetPostDetails = createRequestSaga({
  key: args => `${ACTION_GET_POST_DETAILS}_${JSON.stringify(args)}`,
  // eslint-disable-next-line import/no-named-as-default-member
  request: PostAPIs.getPostDetails,
  onSuccessActionCreators: [post => savePosts({ items: [post] })],
  tokenRequired: 'required'
});

const requestGetGroups = createRequestSaga({
  key: ACTION_GET_GROUPS,
  request: PostAPIs.getGroups,
  tokenRequired: 'required'
});

const requestGetNextPost = createRequestSaga({
  key: ACTION_GET_NEXT_POST,
  request: PostAPIs.getNextPost,
  tokenRequired: 'required',
  onSuccessActionCreators: [savePost]
});

export default function* postsSaga() {
  yield all([
    takeEvery(ACTION_GET_POSTS, requestGetPosts),
    takeEvery(ACTION_GET_POSTS_BY_AUTHOR, requestGetPostsByAuthor),
    takeEvery(ACTION_GET_POST_DETAILS, requestGetPostDetails),
    takeLatest(ACTION_GET_POSTS_BY_GROUP, requestGetPostsByGroup),
    takeLatest(ACTION_GET_GROUPS, requestGetGroups),
    takeLatest(ACTION_GET_NEXT_POST, requestGetNextPost),
    takeEvery(ACTION_GET_RELATED_POSTS, requestGetRelatedPosts)
  ]);
}

import { all, takeLatest, select } from 'redux-saga/effects';
import * as onesignalUtils from 'AINews/src/utils/onesignal';

import {
  REQUEST_ME,
  REQUEST_COMMENT_POST,
  REQUEST_REPLY_COMMENT,
  REQUEST_UPVOTE_POST,
  REQUEST_UNUPVOTE_POST,
  REQUEST_DOWNVOTE_POST,
  REQUEST_UNDOWNVOTE_POST,
  REQUEST_UPVOTE_COMMENT,
  REQUEST_UNUPVOTE_COMMENT,
  REQUEST_DOWNVOTE_COMMENT,
  REQUEST_UNDOWNVOTE_COMMENT,
  REQUEST_UPDATE_PROFILE,
  REQUEST_RETRY_COMMENT_POST,
  REQUEST_RETRY_REPLY_COMMENT,
  REQUEST_ADD_BOOKMARK,
  REQUEST_GET_BOOKMARKS,
  REQUEST_DELETE_BOOKMARK,
  REQUEST_FOLLOW_AUTHOR,
  REQUEST_UNFOLLOW_AUTHOR,
  REQUEST_FOLLOW_CATEGORY,
  REQUEST_UNFOLLOW_CATEGORY,
  ACTION_UPDATE_AVATAR,
  REQUEST_HIDE_POST,
  REQUEST_REPORT_POST,
  REQUEST_DELETE_COMMENT,
  REQUEST_DELETE_SUB_COMMENT,
  REQUEST_EDIT_COMMENT,
  REQUEST_EDIT_SUB_COMMENT,
  REQUEST_USER_LIST_COMMENT,
  REQUEST_UPDATE_CATEGORIES
} from '../constants';
import UserAPIs from '../APIs/user';
import { createRequestSaga } from '../../utils/RequestSagaUtils';
import {
  increasePostComments,
  upvotePostLocally,
  unupvotePostLocally,
  downvotePostLocally,
  undownvotePostLocally,
  savePosts,
  addBookmarkLocally,
  deleteBookmarkLocally,
  decreasePostComments
} from '../actions/posts';
import { saveMe, updateMe } from '../actions/user';
import {
  addCommment,
  upvoteCommentLocally,
  unupvoteCommentLocally,
  downvoteCommentLocally,
  undownvoteCommentLocally,
  retryAddComment,
  setCommentRemoteId,
  addCommentSucceeded,
  addCommentFailed,
  decreaseSubComments,
  editCommentLocally,
  editSubCommentLocally
} from '../actions/comments';
import { followAuthorLocally, unfollowAuthorLocally } from '../actions/authors';
import { noop } from '../actions/common';
import {
  updateAccessToken,
  updateRefreshToken
} from '../../utils/RequestSagaUtils/token/actions';

import { reloadSavedPosts } from '../actions/updateFlags';

const requestUpvotePost = createRequestSaga({
  request: UserAPIs.upvotePost,
  key: REQUEST_UPVOTE_POST,
  tokenRequired: 'required',
  onStartActionCreators: [upvotePostLocally]
});

const requestUnupvotePost = createRequestSaga({
  request: UserAPIs.unupvotePost,
  key: REQUEST_UNUPVOTE_POST,
  tokenRequired: 'required',
  onStartActionCreators: [unupvotePostLocally]
});

const requestDownvotePost = createRequestSaga({
  request: UserAPIs.downvotePost,
  key: REQUEST_DOWNVOTE_POST,
  tokenRequired: 'required',
  onStartActionCreators: [downvotePostLocally]
});

const requestUndownvotePost = createRequestSaga({
  request: UserAPIs.undownvotePost,
  key: REQUEST_UNDOWNVOTE_POST,
  tokenRequired: 'required',
  onStartActionCreators: [undownvotePostLocally]
});

function* requestUpvoteComment(action) {
  const {
    args: [{ commentId }]
  } = action;
  if (typeof commentId === 'string' && commentId.startsWith('local_')) {
    const { remoteId } = yield select(_ => _.comments[commentId]);
    yield createRequestSaga({
      request: UserAPIs.upvoteComment,
      key: REQUEST_UPVOTE_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [
        () => upvoteCommentLocally({ args: [{ commentId }] })
      ]
    })({
      ...action,
      args: [
        {
          ...action.args[0],
          commentId: remoteId
        },
        ...action.args.slice(1)
      ]
    });
  } else {
    yield createRequestSaga({
      request: UserAPIs.upvoteComment,
      key: REQUEST_UPVOTE_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [upvoteCommentLocally]
    })(action);
  }
}

function* requestUnupvoteComment(action) {
  const {
    args: [{ commentId }]
  } = action;
  if (typeof commentId === 'string' && commentId.startsWith('local_')) {
    const { remoteId } = yield select(_ => _.comments[commentId]);
    yield createRequestSaga({
      request: UserAPIs.unupvoteComment,
      key: REQUEST_UNUPVOTE_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [
        () => unupvoteCommentLocally({ args: [{ commentId }] })
      ]
    })({
      ...action,
      args: [
        {
          ...action.args[0],
          commentId: remoteId
        },
        ...action.args.slice(1)
      ]
    });
  } else {
    yield createRequestSaga({
      request: UserAPIs.unupvoteComment,
      key: REQUEST_UNUPVOTE_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [unupvoteCommentLocally]
    })(action);
  }
}

function* requestDownvoteComment(action) {
  const {
    args: [{ commentId }]
  } = action;
  if (typeof commentId === 'string' && commentId.startsWith('local_')) {
    const { remoteId } = yield select(_ => _.comments[commentId]);
    yield createRequestSaga({
      request: UserAPIs.downvoteComment,
      key: REQUEST_DOWNVOTE_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [
        () => downvoteCommentLocally({ args: [{ commentId }] })
      ]
    })({
      ...action,
      args: [
        {
          ...action.args[0],
          commentId: remoteId
        },
        ...action.args.slice(1)
      ]
    });
  } else {
    yield createRequestSaga({
      request: UserAPIs.downvoteComment,
      key: REQUEST_DOWNVOTE_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [downvoteCommentLocally]
    })(action);
  }
}

function* requestUndownvoteComment(action) {
  const {
    args: [{ commentId }]
  } = action;
  if (typeof commentId === 'string' && commentId.startsWith('local_')) {
    const { remoteId } = yield select(_ => _.comments[commentId]);
    yield createRequestSaga({
      request: UserAPIs.undownvoteComment,
      key: REQUEST_UNDOWNVOTE_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [
        () => undownvoteCommentLocally({ args: [{ commentId }] })
      ]
    })({
      ...action,
      args: [
        {
          ...action.args[0],
          commentId: remoteId
        },
        ...action.args.slice(1)
      ]
    });
  } else {
    yield createRequestSaga({
      request: UserAPIs.undownvoteComment,
      key: REQUEST_UNDOWNVOTE_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [undownvoteCommentLocally]
    })(action);
  }
}

const requestMe = createRequestSaga({
  request: UserAPIs.me,
  key: REQUEST_ME,
  tokenRequired: 'required',
  onSuccessActionCreators: [
    saveMe,
    params => {
      if (params && params.id) {
        onesignalUtils.sendTags(params.id);
      }
      return noop();
    }
  ]
});

const requestUpdateProfile = createRequestSaga({
  request: UserAPIs.updateProfile,
  key: REQUEST_UPDATE_PROFILE,
  tokenRequired: 'required',
  onSuccessActionCreators: [updateAccessToken, updateRefreshToken]
});

function* requestComment(action) {
  const {
    args: [{ id, postId }]
  } = action;

  const { authorId } = yield select(_ => _.posts[postId]);

  yield createRequestSaga({
    request: UserAPIs.comment,
    key: REQUEST_COMMENT_POST,
    tokenRequired: 'required',
    onStartActionCreators: [increasePostComments, addCommment],
    onSuccessActionCreators: [
      () => addCommentSucceeded({ id }),
      (...params) => setCommentRemoteId(id, ...params)
    ],
    onErrorActionCreators: [() => addCommentFailed({ id })]
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

function* requestRetryComment(action) {
  const {
    args: [{ id, postId }]
  } = action;

  const { authorId } = yield select(_ => _.posts[postId]);

  yield createRequestSaga({
    request: UserAPIs.comment,
    key: REQUEST_RETRY_COMMENT_POST,
    tokenRequired: 'required',
    onStartActionCreators: [retryAddComment],
    onSuccessActionCreators: [
      () => addCommentSucceeded({ id }),
      (...params) => setCommentRemoteId(id, ...params)
    ],
    onErrorActionCreators: [() => addCommentFailed({ id })]
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

function* requestReply(action) {
  const {
    args: [{ id, commentId }]
  } = action;

  const { remoteId, postId, userId } = yield select(_ => _.comments[commentId]);
  const { authorId } = yield select(_ => _.posts[postId]);

  if (typeof commentId === 'string' && commentId.startsWith('local_')) {
    yield createRequestSaga({
      request: UserAPIs.reply,
      key: REQUEST_REPLY_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [addCommment],
      onSuccessActionCreators: [
        () => addCommentSucceeded({ id }),
        (...params) => setCommentRemoteId(id, ...params)
      ],
      onErrorActionCreators: [() => addCommentFailed({ id })]
    })({
      ...action,
      args: [
        {
          ...action.args[0],
          commentId: remoteId,
          authorId,
          postId,
          userParentId: userId
        },
        ...action.args.slice(1)
      ]
    });
  } else {
    yield createRequestSaga({
      request: UserAPIs.reply,
      key: REQUEST_REPLY_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [addCommment],
      onSuccessActionCreators: [
        () => addCommentSucceeded({ id }),
        (...params) => setCommentRemoteId(id, ...params)
      ],
      onErrorActionCreators: [() => addCommentFailed({ id })]
    })({
      ...action,
      args: [
        {
          ...action.args[0],
          authorId,
          postId,
          userParentId: userId
        },
        ...action.args.slice(1)
      ]
    });
  }
}

function* requestRetryReply(action) {
  const {
    args: [{ id, commentId }]
  } = action;

  const { remoteId, postId, userId } = yield select(_ => _.comments[commentId]);
  const { authorId } = yield select(_ => _.posts[postId]);

  if (typeof commentId === 'string' && commentId.startsWith('local_')) {
    yield createRequestSaga({
      request: UserAPIs.reply,
      key: REQUEST_RETRY_REPLY_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [retryAddComment],
      onSuccessActionCreators: [
        () => addCommentSucceeded({ id }),
        (...params) => setCommentRemoteId(id, ...params)
      ],
      onErrorActionCreators: [() => addCommentFailed({ id })]
    })({
      ...action,
      args: [
        {
          ...action.args[0],
          commentId: remoteId,
          authorId,
          postId,
          userParentId: userId
        },
        ...action.args.slice(1)
      ]
    });
  } else {
    yield createRequestSaga({
      request: UserAPIs.reply,
      key: REQUEST_RETRY_REPLY_COMMENT,
      tokenRequired: 'required',
      onStartActionCreators: [retryAddComment],
      onSuccessActionCreators: [
        () => addCommentSucceeded({ id }),
        (...params) => setCommentRemoteId(id, ...params)
      ],
      onErrorActionCreators: [() => addCommentFailed({ id })]
    })({
      ...action,
      args: [
        {
          ...action.args[0],
          authorId,
          postId,
          userParentId: userId
        },
        ...action.args.slice(1)
      ]
    });
  }
}

const requestAddBookmark = createRequestSaga({
  request: UserAPIs.addBookmark,
  key: args => `${REQUEST_ADD_BOOKMARK}/${JSON.stringify(args)}`,
  tokenRequired: 'required',
  onStartActionCreators: [addBookmarkLocally],
  onSuccessActionCreators: [() => reloadSavedPosts({ timeStamp: Date.now() })]
});

const requestGetBookmark = createRequestSaga({
  request: UserAPIs.getBookmarks,
  key: args => `${REQUEST_GET_BOOKMARKS}/${JSON.stringify(args)}`,
  tokenRequired: 'required',
  onSuccessActionCreators: [savePosts]
});

const requestDeleteBookmark = createRequestSaga({
  request: UserAPIs.deleteBookmark,
  key: args => `${REQUEST_DELETE_BOOKMARK}/${JSON.stringify(args)}`,
  tokenRequired: 'required',
  onStartActionCreators: [deleteBookmarkLocally],
  onSuccessActionCreators: [() => reloadSavedPosts({ timeStamp: Date.now() })]
});

const requestFollowAuthor = createRequestSaga({
  request: UserAPIs.followAuthor,
  key: args => `${REQUEST_FOLLOW_AUTHOR}/${JSON.stringify(args)}`,
  tokenRequired: 'required',
  onStartActionCreators: [followAuthorLocally]
});

const requestUnfollowAuthor = createRequestSaga({
  request: UserAPIs.unfollowAuthor,
  key: args => `${REQUEST_UNFOLLOW_AUTHOR}/${JSON.stringify(args)}`,
  tokenRequired: 'required',
  onStartActionCreators: [unfollowAuthorLocally]
});

const requestFollowCategory = createRequestSaga({
  request: UserAPIs.followCategory,
  key: args => `${REQUEST_FOLLOW_CATEGORY}/${JSON.stringify(args)}`,
  tokenRequired: 'required'
  // onStartActionCreators: [followAuthorLocally]
});

const requestUnfollowCategory = createRequestSaga({
  request: UserAPIs.unfollowCategory,
  key: args => `${REQUEST_UNFOLLOW_CATEGORY}/${JSON.stringify(args)}`,
  tokenRequired: 'required'
  // onStartActionCreators: [unfollowAuthorLocally]
});

const requestUpdateAvatar = createRequestSaga({
  request: UserAPIs.updateAvatar,
  key: ACTION_UPDATE_AVATAR,
  tokenRequired: 'required',
  onSuccessActionCreators: [updateMe, updateAccessToken, updateRefreshToken]
});

const requestHidePost = createRequestSaga({
  request: UserAPIs.hidePost,
  key: REQUEST_HIDE_POST,
  tokenRequired: 'required'
});

const requestReportPost = createRequestSaga({
  request: UserAPIs.reportPost,
  key: REQUEST_REPORT_POST,
  tokenRequired: 'required'
});

const requestDeleteComment = createRequestSaga({
  request: UserAPIs.deleteComment,
  key: REQUEST_DELETE_COMMENT,
  tokenRequired: 'required',
  onStartActionCreators: [decreasePostComments]
});

const requestDeleteSubComment = createRequestSaga({
  request: UserAPIs.deleteSubComment,
  key: REQUEST_DELETE_SUB_COMMENT,
  tokenRequired: 'required',
  onStartActionCreators: [decreaseSubComments]
});

// const requestEditComment = createRequestSaga({
//   request: UserAPIs.editComment,
//   key: REQUEST_EDIT_COMMENT,
//   tokenRequired: 'required',
//   onStartActionCreators: [editCommentLocally]
// });

function* requestEditComment(action) {
  const {
    args: [{ commentId, localCommentId }]
  } = action;

  const { postId } = yield select(_ => _.comments[localCommentId || commentId]);
  const { authorId } = yield select(_ => _.posts[postId]);

  yield createRequestSaga({
    request: UserAPIs.editComment,
    key: REQUEST_EDIT_COMMENT,
    tokenRequired: 'required',
    onStartActionCreators: [editCommentLocally]
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

const requestEditSubComment = createRequestSaga({
  request: UserAPIs.editSubComment,
  key: REQUEST_EDIT_SUB_COMMENT,
  tokenRequired: 'required',
  onStartActionCreators: [editSubCommentLocally]
});

const requestUserListComment = createRequestSaga({
  request: UserAPIs.getComments,
  key: REQUEST_USER_LIST_COMMENT,
  tokenRequired: 'required'
  // onStartActionCreators: []
});

const requestUpdateCategories = createRequestSaga({
  request: UserAPIs.updateCategories,
  key: REQUEST_UPDATE_CATEGORIES,
  tokenRequired: 'required'
});

export default function* userSaga() {
  yield all([
    takeLatest(REQUEST_UPVOTE_POST, requestUpvotePost),
    takeLatest(REQUEST_UNUPVOTE_POST, requestUnupvotePost),
    takeLatest(REQUEST_DOWNVOTE_POST, requestDownvotePost),
    takeLatest(REQUEST_UNDOWNVOTE_POST, requestUndownvotePost),
    takeLatest(REQUEST_UPVOTE_COMMENT, requestUpvoteComment),
    takeLatest(REQUEST_UNUPVOTE_COMMENT, requestUnupvoteComment),
    takeLatest(REQUEST_DOWNVOTE_COMMENT, requestDownvoteComment),
    takeLatest(REQUEST_UNDOWNVOTE_COMMENT, requestUndownvoteComment),
    takeLatest(REQUEST_ME, requestMe),
    takeLatest(REQUEST_COMMENT_POST, requestComment),
    takeLatest(REQUEST_RETRY_COMMENT_POST, requestRetryComment),
    takeLatest(REQUEST_REPLY_COMMENT, requestReply),
    takeLatest(REQUEST_RETRY_REPLY_COMMENT, requestRetryReply),
    takeLatest(REQUEST_UPDATE_PROFILE, requestUpdateProfile),
    takeLatest(REQUEST_ADD_BOOKMARK, requestAddBookmark),
    takeLatest(REQUEST_GET_BOOKMARKS, requestGetBookmark),
    takeLatest(REQUEST_DELETE_BOOKMARK, requestDeleteBookmark),
    takeLatest(REQUEST_FOLLOW_AUTHOR, requestFollowAuthor),
    takeLatest(REQUEST_UNFOLLOW_AUTHOR, requestUnfollowAuthor),
    takeLatest(REQUEST_FOLLOW_CATEGORY, requestFollowCategory),
    takeLatest(REQUEST_UNFOLLOW_CATEGORY, requestUnfollowCategory),
    takeLatest(ACTION_UPDATE_AVATAR, requestUpdateAvatar),
    takeLatest(REQUEST_HIDE_POST, requestHidePost),
    takeLatest(REQUEST_REPORT_POST, requestReportPost),
    takeLatest(REQUEST_DELETE_COMMENT, requestDeleteComment),
    takeLatest(REQUEST_DELETE_SUB_COMMENT, requestDeleteSubComment),
    takeLatest(REQUEST_EDIT_COMMENT, requestEditComment),
    takeLatest(REQUEST_EDIT_SUB_COMMENT, requestEditSubComment),
    takeLatest(REQUEST_USER_LIST_COMMENT, requestUserListComment),
    takeLatest(REQUEST_UPDATE_CATEGORIES, requestUpdateCategories)
  ]);
}

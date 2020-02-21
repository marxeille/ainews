import {
  REQUEST_GET_SUB_COMMENTS,
  REQUEST_GET_NEWEST_COMMENTS,
  REQUEST_GET_TOP_COMMENTS,
  ACTION_SAVE_COMMENTS,
  ACTION_ADD_POST_COMMENT,
  ACTION_UPVOTE_COMMENT,
  ACTION_UNUPVOTE_COMMENT,
  ACTION_DOWNVOTE_COMMENT,
  ACTION_UNDOWNVOTE_COMMENT,
  ACTION_ADD_POST_COMMENT_SUCCEEDED,
  ACTION_ADD_POST_COMMENT_FAILED,
  ACTION_RETRY_ADD_POST_COMMENT,
  ACTION_SET_COMMENT_REMOTE_ID,
  ACTION_FLUSH_COMMENTS,
  ACTION_INCREASE_SUB_COMMENTS,
  ACTION_DECREASE_SUB_COMMENTS,
  ACTION_EDIT_COMMENT_LOCALLY,
  ACITON_EDIT_SUB_COMMENT_LOCALLY
} from '../constants';

export const getNewestComments = ({ postId, lastId, size }, callback) => ({
  type: REQUEST_GET_NEWEST_COMMENTS,
  args: [
    {
      postId,
      lastId,
      size
    },
    callback
  ]
});

export const getTopComments = ({ postId, page, size }, callback) => ({
  type: REQUEST_GET_TOP_COMMENTS,
  args: [
    {
      postId,
      page,
      size
    },
    callback
  ]
});

export const getSubComments = ({ commentId, lastId, size }, callback) => ({
  type: REQUEST_GET_SUB_COMMENTS,
  args: [
    {
      commentId,
      lastId,
      size
    },
    callback
  ]
});

export const saveComments = ({ items }) => ({
  type: ACTION_SAVE_COMMENTS,
  payload: {
    items
  }
});

export const flushComments = () => ({
  type: ACTION_FLUSH_COMMENTS
});

export const addCommment = ({
  args: [{ id, userId, postId, commentId, content, createdAt, user }]
}) => ({
  type: ACTION_ADD_POST_COMMENT,
  payload: {
    id,
    userId,
    postId,
    commentId,
    content,
    createdAt,
    user
  }
});

export const setCommentRemoteId = (localId, { commentId }) => ({
  type: ACTION_SET_COMMENT_REMOTE_ID,
  payload: {
    localId,
    remoteId: commentId
  }
});

export const retryAddComment = ({ args: [{ id }] }) => ({
  type: ACTION_RETRY_ADD_POST_COMMENT,
  payload: { id }
});

export const addCommentSucceeded = ({ id }) => ({
  type: ACTION_ADD_POST_COMMENT_SUCCEEDED,
  payload: { id }
});

export const addCommentFailed = ({ id }) => ({
  type: ACTION_ADD_POST_COMMENT_FAILED,
  payload: { id }
});

export const upvoteCommentLocally = ({ args: [{ commentId }] }) => ({
  type: ACTION_UPVOTE_COMMENT,
  payload: {
    commentId
  }
});

export const unupvoteCommentLocally = ({ args: [{ commentId }] }) => ({
  type: ACTION_UNUPVOTE_COMMENT,
  payload: {
    commentId
  }
});

export const downvoteCommentLocally = ({ args: [{ commentId }] }) => ({
  type: ACTION_DOWNVOTE_COMMENT,
  payload: {
    commentId
  }
});

export const undownvoteCommentLocally = ({ args: [{ commentId }] }) => ({
  type: ACTION_UNDOWNVOTE_COMMENT,
  payload: {
    commentId
  }
});

export const increaseSubComments = ({ args: [{ parentCmtId }] }) => ({
  type: ACTION_INCREASE_SUB_COMMENTS,
  payload: {
    parentCmtId
  }
});

export const decreaseSubComments = ({ args: [{ parentCmtId }] }) => ({
  type: ACTION_DECREASE_SUB_COMMENTS,
  payload: {
    parentCmtId
  }
});

export const editCommentLocally = ({
  args: [{ localCommentId, content }]
}) => ({
  type: ACTION_EDIT_COMMENT_LOCALLY,
  payload: {
    commentId: localCommentId,
    content
  }
});

export const editSubCommentLocally = ({
  args: [{ localCommentId, content }]
}) => ({
  type: ACITON_EDIT_SUB_COMMENT_LOCALLY,
  payload: {
    commentId: localCommentId,
    content
  }
});

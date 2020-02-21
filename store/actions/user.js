import {
  ACTION_SET_FAVOURITE_CATEGORIES,
  REQUEST_ME,
  REQUEST_COMMENT_POST,
  REQUEST_REPLY_COMMENT,
  ACTION_SAVE_ME,
  ACTION_REMOVE_ME,
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
  ACTION_UPDTATE_ME,
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

export const setFavouriteCategories = categories => ({
  type: ACTION_SET_FAVOURITE_CATEGORIES,
  payload: {
    categories
  }
});

export const upvotePost = ({ postId }) => ({
  type: REQUEST_UPVOTE_POST,
  args: [
    {
      postId
    }
  ]
});

export const unupvotePost = ({ postId }) => ({
  type: REQUEST_UNUPVOTE_POST,
  args: [
    {
      postId
    }
  ]
});

export const downvotePost = ({ postId }) => ({
  type: REQUEST_DOWNVOTE_POST,
  args: [
    {
      postId
    }
  ]
});

export const undownvotePost = ({ postId }) => ({
  type: REQUEST_UNDOWNVOTE_POST,
  args: [
    {
      postId
    }
  ]
});

export const upvoteComment = ({ commentId, type }) => ({
  type: REQUEST_UPVOTE_COMMENT,
  args: [
    {
      commentId,
      type
    }
  ]
});

export const unupvoteComment = ({ commentId, type }) => ({
  type: REQUEST_UNUPVOTE_COMMENT,
  args: [
    {
      commentId,
      type
    }
  ]
});

export const downvoteComment = ({ commentId, type }) => ({
  type: REQUEST_DOWNVOTE_COMMENT,
  args: [
    {
      commentId,
      type
    }
  ]
});

export const undownvoteComment = ({ commentId, type }) => ({
  type: REQUEST_UNDOWNVOTE_COMMENT,
  args: [
    {
      commentId,
      type
    }
  ]
});

export const commentPost = ({ postId, content, ...rest }, callback) => ({
  type: REQUEST_COMMENT_POST,
  args: [
    {
      postId,
      content,
      ...rest
    },
    callback
  ]
});

export const retryCommentPost = ({ id, postId, content }, callback) => ({
  type: REQUEST_RETRY_COMMENT_POST,
  args: [
    {
      id,
      postId,
      content
    },
    callback
  ]
});

export const replyComment = ({ commentId, content, ...rest }, callback) => ({
  type: REQUEST_REPLY_COMMENT,
  args: [
    {
      commentId,
      content,
      ...rest
    },
    callback
  ]
});

export const retryReplyComment = ({ id, commentId, content }, callback) => ({
  type: REQUEST_RETRY_REPLY_COMMENT,
  args: [
    {
      id,
      commentId,
      content
    },
    callback
  ]
});

export const me = callback => ({
  type: REQUEST_ME,
  args: [callback]
});

export const saveMe = profile => ({
  type: ACTION_SAVE_ME,
  payload: {
    ...profile
  }
});

export const updateMe = profile => ({
  type: ACTION_UPDTATE_ME,
  payload: {
    ...profile
  }
});

export const removeMe = () => ({ type: ACTION_REMOVE_ME });

export const updateProfile = ({ fullName, about }, callback) => ({
  type: REQUEST_UPDATE_PROFILE,
  args: [
    {
      fullName,
      about
    },
    callback
  ]
});

export const addBookmark = ({ postId }, callback) => ({
  type: REQUEST_ADD_BOOKMARK,
  args: [
    {
      postId
    },
    callback
  ]
});

export const getBookmarks = ({ page, size }, callback) => ({
  type: REQUEST_GET_BOOKMARKS,
  args: [
    {
      page,
      size
    },
    callback
  ]
});

export const deleteBookmark = ({ postId }, callback) => ({
  type: REQUEST_DELETE_BOOKMARK,
  args: [
    {
      postId
    },
    callback
  ]
});

export const followAuthor = ({ authorId }, callback) => ({
  type: REQUEST_FOLLOW_AUTHOR,
  args: [
    {
      authorId
    },
    callback
  ]
});

export const unfollowAuthor = ({ authorId }, callback) => ({
  type: REQUEST_UNFOLLOW_AUTHOR,
  args: [
    {
      authorId
    },
    callback
  ]
});

export const followCategory = ({ categoryId }, callback) => ({
  type: REQUEST_FOLLOW_CATEGORY,
  args: [
    {
      categoryId
    },
    callback
  ]
});

export const unfollowCategory = ({ categoryId }, callback) => ({
  type: REQUEST_UNFOLLOW_CATEGORY,
  args: [
    {
      categoryId
    },
    callback
  ]
});

export const updateAvatar = ({ avatar }, callback) => ({
  type: ACTION_UPDATE_AVATAR,
  args: [
    {
      avatar
    },
    callback
  ]
});

export const ignorePost = ({ postId }, callback) => ({
  type: REQUEST_HIDE_POST,
  args: [
    {
      postId
    },
    callback
  ]
});

export const reportPost = ({ postId, reason, reasonId }, callback) => ({
  type: REQUEST_REPORT_POST,
  args: [
    {
      postId,
      reason,
      reasonId
    },
    callback
  ]
});

export const deleteComment = ({ postId, commentId }, callback) => ({
  type: REQUEST_DELETE_COMMENT,
  args: [
    {
      postId,
      commentId
    },
    callback
  ]
});

export const deleteSubComment = ({ parentCmtId, commentId }, callback) => ({
  type: REQUEST_DELETE_SUB_COMMENT,
  args: [
    {
      parentCmtId,
      commentId
    },
    callback
  ]
});

export const editComment = (
  { postId, commentId, localCommentId, content },
  callback
) => ({
  type: REQUEST_EDIT_COMMENT,
  args: [
    {
      postId,
      commentId,
      localCommentId,
      content
    },
    callback
  ]
});

export const editSubComment = (
  { parentCmtId, commentId, localCommentId, content },
  callback
) => ({
  type: REQUEST_EDIT_SUB_COMMENT,
  args: [
    {
      parentCmtId,
      commentId,
      localCommentId,
      content
    },
    callback
  ]
});

export const getUserListComment = ({ size, lastId }, callback) => ({
  type: REQUEST_USER_LIST_COMMENT,
  args: [
    {
      size,
      lastId
    },
    callback
  ]
});

export const updateCategories = ({ updatedCategories }, callback) => ({
  type: REQUEST_UPDATE_CATEGORIES,
  args: [
    {
      updatedCategories
    },
    callback
  ]
});

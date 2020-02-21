import {
  ACTION_GET_POSTS,
  ACTION_GET_POST_DETAILS,
  ACTION_SAVE_POSTS,
  ACTION_SAVE_POST,
  ACTION_INCREASE_POST_COMMENTS,
  ACTION_DECREASE_POST_COMMENTS,
  ACTION_UPVOTE_POST,
  ACTION_UNUPVOTE_POST,
  ACTION_DOWNVOTE_POST,
  ACTION_UNDOWNVOTE_POST,
  ACTION_GET_POSTS_BY_AUTHOR,
  ACTION_GET_POSTS_BY_GROUP,
  ACTION_ADD_BOOKMARK_LOCALLY,
  ACTION_DELETE_BOOKMARK_LOCALLY,
  ACTION_GET_NEXT_POST,
  ACTION_GET_GROUPS,
  ACTION_GET_RELATED_POSTS
} from '../constants';

export const getPosts = ({ lastId, size, filters, orderBy }, callback) => ({
  type: ACTION_GET_POSTS,
  args: [
    {
      lastId,
      size,
      filters,
      orderBy
    },
    callback
  ]
});

export const getPostsByAuthor = (
  { authorId, lastId, size, orderBy },
  callback
) => ({
  type: ACTION_GET_POSTS_BY_AUTHOR,
  args: [
    {
      authorId,
      lastId,
      size,
      orderBy
    },
    callback
  ]
});

export const getPostsByGroup = (
  { groupName, page, size, orderBy },
  callback
) => ({
  type: ACTION_GET_POSTS_BY_GROUP,
  args: [
    {
      groupName,
      page,
      size,
      orderBy
    },
    callback
  ]
});

export const getPostDetails = ({ id }, callback) => ({
  type: ACTION_GET_POST_DETAILS,
  args: [
    {
      id
    },
    callback
  ]
});

export const getGroups = callback => ({
  type: ACTION_GET_GROUPS,
  args: [callback]
});

export const getNextPost = ({ lastId, filters }, callback) => ({
  type: ACTION_GET_NEXT_POST,
  args: [
    {
      lastId,
      filters
    },
    callback
  ]
});

export const savePosts = ({ items }) => ({
  type: ACTION_SAVE_POSTS,
  payload: {
    items
  }
});

export const savePost = post => ({
  type: ACTION_SAVE_POST,
  payload: {
    post
  }
});

export const upvotePostLocally = ({ args: [{ postId }] }) => ({
  type: ACTION_UPVOTE_POST,
  payload: {
    postId
  }
});

export const unupvotePostLocally = ({ args: [{ postId }] }) => ({
  type: ACTION_UNUPVOTE_POST,
  payload: {
    postId
  }
});

export const downvotePostLocally = ({ args: [{ postId }] }) => ({
  type: ACTION_DOWNVOTE_POST,
  payload: {
    postId
  }
});

export const undownvotePostLocally = ({ args: [{ postId }] }) => ({
  type: ACTION_UNDOWNVOTE_POST,
  payload: {
    postId
  }
});

export const increasePostComments = ({ args: [{ postId }] }) => ({
  type: ACTION_INCREASE_POST_COMMENTS,
  payload: {
    postId
  }
});

export const decreasePostComments = ({ args: [{ postId }] }) => ({
  type: ACTION_DECREASE_POST_COMMENTS,
  payload: {
    postId
  }
});

export const addBookmarkLocally = ({ args: [{ postId }] }) => ({
  type: ACTION_ADD_BOOKMARK_LOCALLY,
  payload: {
    postId
  }
});

export const deleteBookmarkLocally = ({ args: [{ postId }] }) => ({
  type: ACTION_DELETE_BOOKMARK_LOCALLY,
  payload: {
    postId
  }
});

export const getRelatedPosts = ({ postId }, callback) => ({
  type: ACTION_GET_RELATED_POSTS,
  args: [
    {
      postId
    },
    callback
  ]
});

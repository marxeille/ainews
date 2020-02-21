import {
  ACTION_GET_FOLLOWED_AUTHORS,
  ACTION_GET_AUTHOR_SUGGESTIONS,
  ACTION_GET_AUTHOR_PROFILE,
  ACTION_SAVE_AUTHORS,
  ACTION_SAVE_FOLLOWING_AUTHORS,
  ACTION_RESET_AUTHORS,
  ACTION_FOLLOW_AUTHOR,
  ACTION_UNFOLLOW_AUTHOR
} from '../constants';

export const getFollowedAuthors = ({ page, size }, callback) => ({
  type: ACTION_GET_FOLLOWED_AUTHORS,
  args: [
    {
      page,
      size
    },
    callback
  ]
});

export const getAuthorSuggestions = ({ page, size }, callback) => ({
  type: ACTION_GET_AUTHOR_SUGGESTIONS,
  args: [
    {
      page,
      size
    },
    callback
  ]
});

export const getAuthorProfile = ({ authorId }, callback) => ({
  type: ACTION_GET_AUTHOR_PROFILE,
  args: [{ authorId }, callback]
});

export const saveAuthors = ({ items }) => ({
  type: ACTION_SAVE_AUTHORS,
  payload: {
    items
  }
});

export const saveFollowingAuthors = ({ items }) => ({
  type: ACTION_SAVE_FOLLOWING_AUTHORS,
  payload: {
    items
  }
});

export const resetAuthors = () => ({
  type: ACTION_RESET_AUTHORS
});

export const followAuthorLocally = ({ args: [{ authorId }] }) => ({
  type: ACTION_FOLLOW_AUTHOR,
  payload: {
    authorId
  }
});

export const unfollowAuthorLocally = ({ args: [{ authorId }] }) => ({
  type: ACTION_UNFOLLOW_AUTHOR,
  payload: {
    authorId
  }
});

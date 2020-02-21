import {
  ACTION_FOLLOW_AUTHOR,
  ACTION_UNFOLLOW_AUTHOR,
  ACTION_SAVE_AUTHORS,
  ACTION_SAVE_FOLLOWING_AUTHORS,
  ACTION_RESET_AUTHORS
} from 'AINews/src/store/constants';

const defaultState = {};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  if (type === ACTION_SAVE_AUTHORS) {
    const { items } = payload;
    const newAuthors = items.reduce((acc, { author, followed }) => {
      if (!author || !followed) {
        return acc;
      }
      return {
        ...acc,
        [author.id]: {
          following: followed || false
        }
      };
    }, {});

    return { ...state, ...newAuthors };
  }

  if (type === ACTION_SAVE_FOLLOWING_AUTHORS) {
    const { items } = payload;
    const followingAuthors = items.reduce(
      (acc, { id }) => ({
        ...acc,
        [id]: {
          following: true
        }
      }),
      {}
    );

    return { ...state, ...followingAuthors };
  }

  if (type === ACTION_RESET_AUTHORS) {
    return defaultState;
  }

  if (type === ACTION_FOLLOW_AUTHOR) {
    const { authorId } = payload;
    return {
      ...state,
      [authorId]: {
        ...state[authorId],
        following: true
      }
    };
  }

  if (type === ACTION_UNFOLLOW_AUTHOR) {
    const { authorId } = payload;
    return {
      ...state,
      [authorId]: {
        ...state[authorId],
        following: false
      }
    };
  }

  return state;
};

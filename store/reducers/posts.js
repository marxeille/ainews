import {
  ACTION_SAVE_POSTS,
  ACTION_SAVE_POST,
  ACTION_INCREASE_POST_COMMENTS,
  ACTION_DECREASE_POST_COMMENTS,
  ACTION_UPVOTE_POST,
  ACTION_UNUPVOTE_POST,
  ACTION_DOWNVOTE_POST,
  ACTION_UNDOWNVOTE_POST,
  ACTION_ADD_BOOKMARK_LOCALLY,
  ACTION_DELETE_BOOKMARK_LOCALLY
} from '../constants';

const defaultState = {};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  if (type === ACTION_SAVE_POST) {
    const { post } = payload;

    const {
      id,
      authorId,
      title,
      shortContent,
      content,
      featureImages,
      displayType,
      video,
      createdAt,
      updatedAt,
      author,
      shareNumber,
      commentNumber,
      upVoteNumber,
      downVoteNumber,
      vote,
      categories,
      saved
    } = post;

    return {
      ...state,
      [id]: {
        id,
        authorId,
        title,
        shortContent,
        content,
        featureImages,
        displayType,
        video,
        createdAt,
        updatedAt,
        author: {
          id: author.id,
          fullName: author.fullName,
          avatar: author.avatar
        },
        shareNumber,
        commentNumber,
        upVoteNumber,
        downVoteNumber,
        vote,
        categories,
        saved
      }
    };
  }

  if (type === ACTION_SAVE_POSTS) {
    const { items } = payload;

    const newPosts = items.reduce(
      (
        acc,
        {
          id,
          authorId,
          title,
          shortContent,
          content,
          featureImages,
          displayType,
          video,
          createdAt,
          updatedAt,
          author,
          shareNumber,
          commentNumber,
          upVoteNumber,
          downVoteNumber,
          vote,
          categories,
          saved
        }
      ) => {
        if (displayType === 7749 || displayType === 9537) {
          return acc;
        }
        return {
          ...acc,
          [id]: {
            id,
            authorId,
            title,
            shortContent,
            content,
            featureImages,
            displayType,
            video,
            createdAt,
            updatedAt,
            author: {
              id: author.id,
              fullName: author.fullName,
              avatar: author.avatar
            },
            shareNumber,
            commentNumber,
            upVoteNumber,
            downVoteNumber,
            vote,
            categories,
            saved
          }
        };
      },
      {}
    );

    return { ...state, ...newPosts };
  }

  if (type === ACTION_UPVOTE_POST) {
    const { postId } = payload;
    const { vote } = state[postId];
    if (vote === 1) {
      return state;
    }

    if (vote === -1) {
      return {
        ...state,
        [postId]: {
          ...state[postId],
          vote: 1,
          upVoteNumber: (state[postId].upVoteNumber || 0) + 1,
          downVoteNumber: (state[postId].downVoteNumber || 1) - 1
        }
      };
    }

    return {
      ...state,
      [postId]: {
        ...state[postId],
        vote: 1,
        upVoteNumber: (state[postId].upVoteNumber || 0) + 1
      }
    };
  }

  if (type === ACTION_UNUPVOTE_POST) {
    const { postId } = payload;
    const { vote } = state[postId];
    if (vote !== 1) {
      return state;
    }

    return {
      ...state,
      [postId]: {
        ...state[postId],
        vote: 0,
        upVoteNumber: (state[postId].upVoteNumber || 1) - 1
      }
    };
  }

  if (type === ACTION_DOWNVOTE_POST) {
    const { postId } = payload;
    const { vote } = state[postId];
    if (vote === -1) {
      return state;
    }

    if (vote === 1) {
      return {
        ...state,
        [postId]: {
          ...state[postId],
          vote: -1,
          upVoteNumber: (state[postId].upVoteNumber || 1) - 1,
          downVoteNumber: (state[postId].downVoteNumber || 0) + 1
        }
      };
    }

    return {
      ...state,
      [postId]: {
        ...state[postId],
        vote: -1,
        downVoteNumber: (state[postId].downVoteNumber || 0) + 1
      }
    };
  }

  if (type === ACTION_UNDOWNVOTE_POST) {
    const { postId } = payload;
    const { vote } = state[postId];
    if (vote !== -1) {
      return state;
    }

    return {
      ...state,
      [postId]: {
        ...state[postId],
        vote: 0,
        downVoteNumber: (state[postId].downVoteNumber || 1) - 1
      }
    };
  }

  if (type === ACTION_INCREASE_POST_COMMENTS) {
    const { postId } = payload;
    return {
      ...state,
      [postId]: {
        ...state[postId],
        commentNumber: (state[postId].commentNumber || 0) + 1
      }
    };
  }

  if (type === ACTION_DECREASE_POST_COMMENTS) {
    const { postId } = payload;
    return {
      ...state,
      [postId]: {
        ...state[postId],
        commentNumber: (state[postId].commentNumber || 1) - 1
      }
    };
  }

  if (type === ACTION_ADD_BOOKMARK_LOCALLY) {
    const { postId } = payload;
    return {
      ...state,
      [postId]: {
        ...state[postId],
        saved: true
      }
    };
  }

  if (type === ACTION_DELETE_BOOKMARK_LOCALLY) {
    const { postId } = payload;
    return {
      ...state,
      [postId]: {
        ...state[postId],
        saved: false
      }
    };
  }

  return state;
};

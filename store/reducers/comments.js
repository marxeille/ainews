import {
  ACTION_SAVE_COMMENTS,
  ACTION_ADD_POST_COMMENT,
  ACTION_UPVOTE_COMMENT,
  ACTION_UNUPVOTE_COMMENT,
  ACTION_DOWNVOTE_COMMENT,
  ACTION_UNDOWNVOTE_COMMENT,
  ACTION_ADD_POST_COMMENT_FAILED,
  ACTION_ADD_POST_COMMENT_SUCCEEDED,
  ACTION_RETRY_ADD_POST_COMMENT,
  ACTION_SET_COMMENT_REMOTE_ID,
  ACTION_FLUSH_COMMENTS,
  ACTION_INCREASE_SUB_COMMENTS,
  ACTION_DECREASE_SUB_COMMENTS,
  ACTION_EDIT_COMMENT_LOCALLY,
  ACITON_EDIT_SUB_COMMENT_LOCALLY
} from '../constants';

const defaultState = {};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  if (type === ACTION_SAVE_COMMENTS) {
    const { items } = payload;

    const newComments = items.reduce(
      (
        acc,
        {
          authorId,
          id,
          userId,
          postId,
          commentId,
          content,
          subCommentNumber,
          createdAt,
          user,
          userParentId,
          upVoteNumber,
          downVoteNumber,
          vote
        }
      ) => ({
        ...acc,
        [id]: {
          authorId,
          id,
          userId,
          postId,
          commentId,
          content,
          subCommentNumber,
          createdAt,
          user: {
            id: user.id,
            fullName: user.fullName,
            avatar: user.avatar
          },
          userParentId,
          upVoteNumber,
          downVoteNumber,
          vote
        }
      }),
      {}
    );

    return { ...state, ...newComments };
  }

  if (type === ACTION_FLUSH_COMMENTS) {
    return {};
  }

  if (type === ACTION_ADD_POST_COMMENT) {
    const { id, userId, postId, commentId, content, createdAt, user } = payload;
    return {
      ...state,
      [id]: {
        id,
        userId,
        postId,
        commentId,
        content,
        subCommentNumber: 0,
        createdAt,
        user: {
          id: user.id,
          fullName: user.fullName,
          avatar: user.avatar
        },
        vote: 0,
        upVoteNumber: 0,
        downVoteNumber: 0,
        sendingStatus: 'sending'
      }
    };
  }

  if (type === ACTION_SET_COMMENT_REMOTE_ID) {
    const { localId, remoteId } = payload;
    return {
      ...state,
      [localId]: {
        ...state[localId],
        remoteId
      }
    };
  }

  if (type === ACTION_RETRY_ADD_POST_COMMENT) {
    const { id } = payload;
    return {
      ...state,
      [id]: {
        ...state[id],
        sendingStatus: 'sending'
      }
    };
  }

  if (type === ACTION_ADD_POST_COMMENT_SUCCEEDED) {
    const { id } = payload;
    return {
      ...state,
      [id]: {
        ...state[id],
        sendingStatus: 'succeeded'
      }
    };
  }

  if (type === ACTION_ADD_POST_COMMENT_FAILED) {
    const { id } = payload;
    return {
      ...state,
      [id]: {
        ...state[id],
        sendingStatus: 'failed'
      }
    };
  }

  if (type === ACTION_UPVOTE_COMMENT) {
    const { commentId } = payload;
    const { vote } = state[commentId];
    if (vote === 1) {
      return state;
    }

    if (vote === -1) {
      return {
        ...state,
        [commentId]: {
          ...state[commentId],
          vote: 1,
          upVoteNumber: (state[commentId].upVoteNumber || 0) + 1,
          downVoteNumber: (state[commentId].downVoteNumber || 1) - 1
        }
      };
    }

    return {
      ...state,
      [commentId]: {
        ...state[commentId],
        vote: 1,
        upVoteNumber: (state[commentId].upVoteNumber || 0) + 1
      }
    };
  }

  if (type === ACTION_UNUPVOTE_COMMENT) {
    const { commentId } = payload;
    const { vote } = state[commentId];
    if (vote !== 1) {
      return state;
    }

    return {
      ...state,
      [commentId]: {
        ...state[commentId],
        vote: 0,
        upVoteNumber: (state[commentId].upVoteNumber || 1) - 1
      }
    };
  }

  if (type === ACTION_DOWNVOTE_COMMENT) {
    const { commentId } = payload;
    const { vote } = state[commentId];
    if (vote === -1) {
      return state;
    }

    if (vote === 0) {
      return {
        ...state,
        [commentId]: {
          ...state[commentId],
          vote: -1,
          downVoteNumber: (state[commentId].downVoteNumber || 0) + 1
        }
      };
    }

    return {
      ...state,
      [commentId]: {
        ...state[commentId],
        vote: -1,
        upVoteNumber: (state[commentId].upVoteNumber || 1) - 1,
        downVoteNumber: (state[commentId].downVoteNumber || 0) + 1
      }
    };
  }

  if (type === ACTION_UNDOWNVOTE_COMMENT) {
    const { commentId } = payload;
    const { vote } = state[commentId];
    if (vote !== -1) {
      return state;
    }

    return {
      ...state,
      [commentId]: {
        ...state[commentId],
        vote: 0,
        downVoteNumber: (state[commentId].downVoteNumber || 1) - 1
      }
    };
  }

  if (type === ACTION_INCREASE_SUB_COMMENTS) {
    const { parentCmtId } = payload;
    return {
      ...state,
      [parentCmtId]: {
        ...state[parentCmtId],
        subCommentNumber: (state[parentCmtId].subCommentNumber || 0) + 1
      }
    };
  }

  if (type === ACTION_DECREASE_SUB_COMMENTS) {
    const { parentCmtId } = payload;
    return {
      ...state,
      [parentCmtId]: {
        ...state[parentCmtId],
        subCommentNumber: (state[parentCmtId].subCommentNumber || 1) - 1
      }
    };
  }

  if (type === ACTION_EDIT_COMMENT_LOCALLY) {
    const { commentId, content } = payload;
    return {
      ...state,
      [commentId]: {
        ...state[commentId],
        content
      }
    };
  }

  if (type === ACITON_EDIT_SUB_COMMENT_LOCALLY) {
    const { commentId, content } = payload;
    return {
      ...state,
      [commentId]: {
        ...state[commentId],
        content
      }
    };
  }

  return state;
};

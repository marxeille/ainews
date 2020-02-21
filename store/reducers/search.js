import { ACTION_SEARCH_REPLACE } from '../constants';

const defaultState = {
  isSuggesting: false,
  savedKeyword: []
};

const searchReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_SEARCH_REPLACE:
      return { ...state, ...payload }
    default:
      return state;
  }
};

export default searchReducer;

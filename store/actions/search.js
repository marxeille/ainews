import { ACTION_SEARCH_REPLACE, ACTION_SEARCH_SAVE_KEYWORD } from '../constants';

const replaceSearchReducer = payload => ({ type: ACTION_SEARCH_REPLACE, payload });

const saveKeyword = payload => ({ type: ACTION_SEARCH_SAVE_KEYWORD, payload });

export {
  replaceSearchReducer,
  saveKeyword
};

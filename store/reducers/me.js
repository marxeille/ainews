import {
  ACTION_SAVE_ME,
  ACTION_REMOVE_ME,
  ACTION_LOGOUT,
  ACTION_UPDTATE_ME
} from '../constants';

const defaultState = {
  profile: {}
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  if (type === ACTION_SAVE_ME) {
    return {
      ...state,
      profile: { ...payload }
    };
  }

  if (type === ACTION_UPDTATE_ME) {
    return {
      ...state,
      profile: { ...state.profile, ...payload }
    };
  }

  if (type === ACTION_REMOVE_ME) {
    return {
      ...state,
      profile: {}
    };
  }

  if (type === ACTION_LOGOUT) {
    return defaultState;
  }

  return state;
};

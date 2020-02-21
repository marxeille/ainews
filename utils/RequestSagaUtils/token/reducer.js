import {
  ACTION_UPDATE_ACCESS_TOKEN,
  ACTION_REMOVE_ACCESS_TOKEN,
  ACTION_UPDATE_REFRESH_TOKEN,
  ACTION_REMOVE_REFRESH_TOKEN,
  ACTION_SET_ANONYMOUS_TOKEN,
  ACTION_UNSET_ANONYMOUS_TOKEN
} from '../constants';

const defaultState = {
  token: '',
  refreshToken: '',
  anonymousToken: ''
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  if (type === ACTION_UPDATE_ACCESS_TOKEN) {
    const { token } = payload;
    return {
      ...state,
      token
    };
  }
  if (type === ACTION_REMOVE_ACCESS_TOKEN) {
    return {
      ...state,
      token: ''
    };
  }
  if (type === ACTION_UPDATE_REFRESH_TOKEN) {
    const { refreshToken } = payload;
    return {
      ...state,
      refreshToken
    };
  }
  if (type === ACTION_REMOVE_REFRESH_TOKEN) {
    return {
      ...state,
      refreshToken: ''
    };
  }
  if (type === ACTION_SET_ANONYMOUS_TOKEN) {
    const { anonymousToken } = payload;
    return {
      ...state,
      anonymousToken
    };
  }
  if (type === ACTION_UNSET_ANONYMOUS_TOKEN) {
    return {
      ...state,
      anonymousToken: ''
    };
  }
  return state;
};

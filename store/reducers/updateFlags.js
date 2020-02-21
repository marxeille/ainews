import { ACTION_RELOAD_SAVED_POST } from '../constants';

const defaultState = {
  lastReloadSavedPostTime: 0
};

export default (state = defaultState, action) => {
  const { type, payload } = action

  if (type === ACTION_RELOAD_SAVED_POST) {
    const { timeStamp } = payload
    return {
      ...state,
      lastReloadSavedPostTime: timeStamp
    }
  }

  return state;
}

import { ACTION_SAVE_THEME } from '../constants';

const initState = {
  nightMode: false
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case ACTION_SAVE_THEME:
      return { ...state, nightMode: payload.isNightMode };
    default:
      return state;
  }
};

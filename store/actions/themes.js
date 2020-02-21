import { ACTION_SAVE_THEME } from '../constants';

export const saveTheme = isNightMode => ({
  type: ACTION_SAVE_THEME,
  payload: {
    isNightMode
  }
});

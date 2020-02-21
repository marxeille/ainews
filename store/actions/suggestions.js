import { ACTION_GET_SUGGESTIONS } from '../constants';

export const getSuggestions = callback => ({
  type: ACTION_GET_SUGGESTIONS,
  args: [callback]
});

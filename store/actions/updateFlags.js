import { ACTION_RELOAD_SAVED_POST } from '../constants';

export const reloadSavedPosts = ({ timeStamp }) => ({
  type: ACTION_RELOAD_SAVED_POST,
  payload: {
    timeStamp
  }
})

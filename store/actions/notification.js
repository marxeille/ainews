import { REQUEST_GET_NOTIFICATION } from '../constants';

export const getNotifications = ({ page, size }, callback) => ({
  type: REQUEST_GET_NOTIFICATION,
  args: [
    {
      page,
      size
    },
    callback
  ]
});

import qs from 'qs';
import { API_V2, withToken } from '.';

export default {
  getNotifications: (token, { page, size }) => withToken(
    token,
    API_V2.get,
    `noti?${qs.stringify({
      page,
      size
    })}`
  )
};

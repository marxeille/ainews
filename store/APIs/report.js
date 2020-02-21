import { API_V2, withToken } from '.';

export default {
  getReports: token => withToken(token, API_V2.get, '/reports')
};

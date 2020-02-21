import { API_V2, withToken } from '.';

export default {
  getCategories: token => withToken(token, API_V2.get, '/categories')
};

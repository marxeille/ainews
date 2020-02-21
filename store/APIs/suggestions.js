import { API_V2 } from '.';

export default {
  getSuggestions: () => API_V2.get('/categories')
};

import { API_V2 } from '.';

const searchSuggest = key => API_V2.get('/search/suggest-key', { key });

/**
 * @param
 * @key
 * search key
 * @page @size
 * page 2 size 10 mean from 11 to 20
 */
const search = ({ key }) =>
  API_V2.get('/search', {
    key
  });

const searchUsers = ({ key, page, size }) =>
  API_V2.get('/search/users', {
    key,
    page,
    size
  });

const searchPosts = ({ key, page, size }) =>
  API_V2.get('/search/posts', {
    key,
    page,
    size
  });

export { search, searchSuggest, searchUsers, searchPosts };

import qs from 'qs';
import { API_V2, withToken } from '.';

export default {
  getAuthorSuggestions: (token, { page, size }) =>
    withToken(
      token,
      API_V2.get,
      `users/authors-follow-suggest?${qs.stringify({ page, size })}`
    ),
  getFollowedAuthors: (token, { page, size }) =>
    withToken(
      token,
      API_V2.get,
      `users/authors-following?${qs.stringify({ page, size })}`
    ),
  getAuthorProfile: (token, { authorId }) =>
    withToken(token, API_V2.get, `author/${authorId}`)
};

import qs from 'qs';
import { API_V2, withToken } from '.';

const getPostDetails = (token, { id }) => withToken(token, API_V2.get, `/posts/${id}`);

export { getPostDetails };

export default {
  getPosts: (token, { lastId, size, filters, orderBy }) => withToken(
    token,
    API_V2.get,
    `/posts?${qs.stringify({
      lastId,
      size,
      filters,
      orderBy
    })}`
  ),
  getRelatedPosts: (token, { postId }) => withToken(
    token,
    API_V2.get,
    `/posts/relate?${qs.stringify({
      postId
    })}`
  ),
  getPostsByAuthor: (token, { authorId, lastId, size, orderBy }) => withToken(
    token,
    API_V2.get,
    `/posts/by-author?authorId=${authorId}&${qs.stringify({
      lastId,
      size,
      orderBy
    })}`
  ),
  getPostsByGroup: (token, { groupName, page, size }) => withToken(
    token,
    API_V2.get,
    `/groups/posts?groupName=${groupName}&page=${page}&size=${size}`
  ),
  getGroups: token => withToken(token, API_V2.get, '/groups'),
  getNextPost: (token, { lastId, filters }) => withToken(
    token,
    API_V2.get,
    `/posts/next?${qs.stringify({ lastId, filters })}`
  ),
  getPostDetails
};

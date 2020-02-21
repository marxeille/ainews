import qs from 'qs';
import { API_V2, withToken } from '.';

export default {
  getNewestComments: (token, { postId, lastId, size, authorId }) =>
    withToken(
      token,
      API_V2.get,
      `comments/new?${qs.stringify({
        filters: {
          postId,
          authorId
        },
        size,
        lastId
      })}`
    ),
  getTopComments: (token, { postId, page, size, authorId }) =>
    withToken(
      token,
      API_V2.get,
      `comments/top?${qs.stringify({
        filters: {
          postId,
          authorId
        },
        page,
        size
      })}`
    ),
  getSubComments: (token, { commentId, lastId, size, authorId }) =>
    withToken(
      token,
      API_V2.get,
      `comments/sub?${qs.stringify({
        filters: {
          parentCmtId: commentId,
          authorId
        },
        lastId,
        size
      })}`
    )
};

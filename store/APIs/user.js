import qs from 'qs';
import { API, API_V2, withToken } from '.';

export default {
  upvotePost: (token, { postId }) => withToken(token, API_V2.post, 'users/vote/upvote-post', {
    postId
  }),
  unupvotePost: (token, { postId }) => withToken(token, API_V2.post, 'users/vote/unupvote-post', {
    postId
  }),
  downvotePost: (token, { postId }) => withToken(token, API_V2.post, 'users/vote/downvote-post', {
    postId
  }),
  undownvotePost: (token, { postId }) => withToken(token, API_V2.post, 'users/vote/undownvote-post', {
    postId
  }),

  upvoteComment: (token, { commentId, type }) => withToken(token, API_V2.post, 'users/vote/upvote-comment', {
    commentId,
    type
  }),
  unupvoteComment: (token, { commentId, type }) => withToken(token, API_V2.post, 'users/vote/unupvote-comment', {
    commentId,
    type
  }),
  downvoteComment: (token, { commentId, type }) => withToken(token, API_V2.post, 'users/vote/downvote-comment', {
    commentId,
    type
  }),
  undownvoteComment: (token, { commentId, type }) => withToken(token, API_V2.post, 'users/vote/undownvote-comment', {
    commentId,
    type
  }),

  me: token => withToken(token, API_V2.get, 'users/me'),
  comment: (token, { postId, content, authorId }) => withToken(token, API_V2.post, 'users/comment', {
    postId,
    content,
    authorId
  }),
  reply: (token, { commentId, content, authorId, userParentId, postId }) => withToken(token, API_V2.post, 'users/comment/sub', {
    parentCmtId: commentId,
    content,
    authorId,
    userParentId,
    postId
  }),
  updateProfile: (token, { fullName, about }) => withToken(token, API_V2.put, 'users/update-profile', {
    fullName,
    about
  }),
  addBookmark: (token, { postId }) => withToken(token, API_V2.post, 'users/bookmarks', { postId }),
  getBookmarks: (token, { page, size }) => withToken(
    token,
    API_V2.get,
    `/users/bookmarks?${qs.stringify({ page, size })}`
  ),
  deleteBookmark: (token, { postId }) => withToken(token, API_V2.delete, `/users/bookmarks?postId=${postId}`),
  followAuthor: (token, { authorId }) => withToken(token, API_V2.post, 'users/follow-author', { authorId }),
  unfollowAuthor: (token, { authorId }) => withToken(token, API_V2.post, 'users/unfollow-author', { authorId }),
  followCategory: (token, { categoryId }) => withToken(token, API_V2.post, 'users/follow-category', { categoryId }),
  unfollowCategory: (token, { categoryId }) => withToken(token, API_V2.post, 'users/unfollow-category', { categoryId }),
  updateAvatar: (token, { avatar }) => withToken(token, API_V2.post, 'users/update-avatar', {
    avatar
  }),
  hidePost: (token, { postId }) => withToken(token, API_V2.post, 'users/ignore', { postId }),
  reportPost: (token, { postId, reason, reasonId }) => withToken(token, API_V2.post, 'users/report', { postId, reason, reasonId }),
  deleteComment: (token, { postId, commentId }) => withToken(token, API_V2.delete, 'users/comment', { postId, commentId }),
  deleteSubComment: (token, { parentCmtId, commentId }) => withToken(token, API_V2.delete, 'users/comment/sub', {
    parentCmtId,
    commentId
  }),
  editComment: (token, { postId, commentId, content, authorId }) => withToken(token, API_V2.put, 'users/comment', {
    postId,
    commentId,
    content,
    authorId
  }),
  editSubComment: (token, { parentCmtId, commentId, content }) => withToken(token, API_V2.put, 'users/comment/sub', {
    parentCmtId,
    commentId,
    content
  }),
  getComments: (token, { page, lastId }) => withToken(token, API_V2.get, 'users/comment', { page, lastId }),
  updateCategories: (token, { updatedCategories }) => withToken(token, API_V2.post, 'users/update-follow-category', {
    updatedCategories
  })
};

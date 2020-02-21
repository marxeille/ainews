export const ACTION_LOGIN = 'api/auth/phone/login';
export const ACTION_LOGIN_WITH_FACEBOOK = 'api/auth/facebook/login';
export const ACTION_LOGOUT = 'auth/logout';

export const ACTION_SAVE_THEME = 'app/saveTheme';

export const ACTION_REGISTER_WITH_PHONE = 'api/auth/phone/register';
export const ACTION_VERIFY_WITH_PHONE = 'api/auth/phone/verify';
export const ACTION_UPDATE_REGISTER_INFO = 'api/auth/phone/update-info';

export const ACTION_ADD_CATEGORY_LOCALLY = 'categories/add';
export const ACTION_REMOVE_CATEGORY_LOCALLY = 'categories/remove';
export const ACTION_GET_CATEGORIES = 'api/categories';
export const ACTION_GET_CATEGORIES_WITHOUT_SYNC = 'api/categories/no_sync';
export const ACTION_SYNC_CATEGORIES = '/categories/sync';
export const ACTION_SAVE_CATEGORIES = 'categories/saveCategories';
export const ACTION_GET_SUGGESTIONS = 'api/suggestions';
export const ACTION_GET_POSTS = 'api/posts';
export const ACTION_GET_POSTS_BY_AUTHOR = 'api/posts/by-author';
export const ACTION_GET_POSTS_BY_GROUP = 'api/posts/by-group';
export const ACTION_GET_POST_DETAILS = 'api/post/details';
export const ACTION_GET_RELATED_POSTS = 'api/releated-posts';

export const ACTION_GET_GROUPS = 'api/groups';
export const ACTION_GET_NEXT_POST = 'api/post/next';
export const ACTION_GET_AUTHOR_SUGGESTIONS = 'api/authors/suggestions';
export const ACTION_GET_FOLLOWED_AUTHORS = 'api/authors/followed';
export const REQUEST_ME = 'api/users/me';
export const REQUEST_UPDATE_PROFILE = 'api/users/update-profile';
export const ACTION_GET_AUTHOR_PROFILE = 'api/authors/profile';
export const ACTION_UPDATE_AVATAR = 'api/users/update-avatar';

export const REQUEST_UPVOTE_POST = 'api/users/vote/upvote-post';
export const REQUEST_UNUPVOTE_POST = 'api/users/vote/unupvote-post';
export const REQUEST_DOWNVOTE_POST = 'api/users/vote/downvote-post';
export const REQUEST_UNDOWNVOTE_POST = 'api/users/vote/undownvote-post';
export const REQUEST_UPVOTE_COMMENT = 'api/users/vote/upvote-comment';
export const REQUEST_UNUPVOTE_COMMENT = 'api/users/vote/unupvote-comment';
export const REQUEST_DOWNVOTE_COMMENT = 'api/users/vote/downvote-comment';
export const REQUEST_UNDOWNVOTE_COMMENT = 'api/users/vote/undownvote-comment';
export const REQUEST_ADD_BOOKMARK = 'api/users/bookmark/add';
export const REQUEST_GET_BOOKMARKS = 'api/users/bookmark';
export const REQUEST_DELETE_BOOKMARK = 'api/users/bookmark/delete';
export const REQUEST_FOLLOW_AUTHOR = 'api/users/follow-author';
export const REQUEST_UNFOLLOW_AUTHOR = 'api/users/unfollow-author';
export const REQUEST_FOLLOW_CATEGORY = 'api/users/follow-category';
export const REQUEST_UNFOLLOW_CATEGORY = 'api/users/unfollow-category';
export const REQUEST_HIDE_POST = 'api/users/ignore';
export const REQUEST_REPORT_POST = 'api/users/report';
export const ACTION_GET_REPORTS = 'api/reports';
export const ACTION_SAVE_REPORTS = 'api/reports/save';
export const REQUEST_DELETE_COMMENT = 'api/users/comment/delete';
export const REQUEST_DELETE_SUB_COMMENT = 'api/users/comment/sub/delete';
export const REQUEST_EDIT_COMMENT = 'api/users/comment/edit';
export const REQUEST_EDIT_SUB_COMMENT = 'api/users/comment/sub/edit';
export const REQUEST_USER_LIST_COMMENT = 'api/users/comment/list';
export const REQUEST_UPDATE_CATEGORIES = 'api/users/update-follow-category';
export const REQUEST_FORGOT_PASSWORD = 'api/users/forgot-password';

export const ACTION_UPVOTE_POST = 'users/vote/upvote-post';
export const ACTION_UNUPVOTE_POST = 'users/vote/unupvote-post';
export const ACTION_DOWNVOTE_POST = 'users/vote/downvote-post';
export const ACTION_UNDOWNVOTE_POST = 'users/vote/undownvote-post';
export const ACTION_UPVOTE_COMMENT = 'users/vote/upvote-comment';
export const ACTION_UNUPVOTE_COMMENT = 'users/vote/unupvote-comment';
export const ACTION_DOWNVOTE_COMMENT = 'users/vote/downvote-comment';
export const ACTION_UNDOWNVOTE_COMMENT = 'users/vote/undownvote-comment';
export const ACTION_ADD_BOOKMARK_LOCALLY = 'users/bookmark/add';
export const ACTION_DELETE_BOOKMARK_LOCALLY = 'users/bookmark/delete';
export const ACTION_EDIT_COMMENT_LOCALLY = 'users/comment/edit';
export const ACITON_EDIT_SUB_COMMENT_LOCALLY = 'users/comment/sub/edit';

export const ACTION_SAVE_AUTHORS = 'authors/save';
export const ACTION_SAVE_FOLLOWING_AUTHORS = 'authors-followings/save';
export const ACTION_RESET_AUTHORS = 'authors/reset';
export const ACTION_FOLLOW_AUTHOR = 'authors/follow';
export const ACTION_UNFOLLOW_AUTHOR = 'authors/unfollow';

export const REQUEST_GET_NEWEST_COMMENTS = 'api/comments/newest';
export const REQUEST_GET_TOP_COMMENTS = 'api/comments/top';
export const REQUEST_GET_SUB_COMMENTS = 'api/comments/sub';
export const REQUEST_COMMENT_POST = 'api/users/comment';
export const REQUEST_RETRY_COMMENT_POST = 'api/users/comment/retry';
export const REQUEST_REPLY_COMMENT = 'api/users/reply';
export const REQUEST_RETRY_REPLY_COMMENT = 'api/users/reply/retry';
export const REQUEST_LOGIN_ANONYMOUSLY = 'api/auth/anonymous/token';
export const ACTION_ADD_POST_COMMENT = 'posts/add_comment';
export const ACTION_SET_COMMENT_REMOTE_ID = 'posts/comments/set_remote_id';
export const ACTION_RETRY_ADD_POST_COMMENT = 'posts/add_comment/retry';
export const ACTION_ADD_POST_COMMENT_SUCCEEDED = 'post/add_comment/succeed';
export const ACTION_ADD_POST_COMMENT_FAILED = 'post/add_comment/failed';

export const ACTION_SET_FAVOURITE_CATEGORIES = 'user/favourite_categories';
export const ACTION_INCREASE_POST_COMMENTS = 'posts/increase_comments';
export const ACTION_DECREASE_POST_COMMENTS = 'posts/decrease_comments';

export const ACTION_SAVE_POST = 'posts/save_post';
export const ACTION_SAVE_POSTS = 'posts/save_posts';
export const ACTION_SAVE_COMMENTS = 'comments/save_comments';
export const ACTION_FLUSH_COMMENTS = 'comments/flush_comments';
export const ACTION_INCREASE_SUB_COMMENTS = 'comments/sub/increase';
export const ACTION_DECREASE_SUB_COMMENTS = 'comments/sub/decrease';

export const ACTION_SAVE_ME = 'me/save';
export const ACTION_UPDTATE_ME = 'me/update';
export const ACTION_REMOVE_ME = 'me/remove';

export const ACTION_RELOAD_SAVED_POST = 'updateFlags/reload_saved_post';

export const ACTION_SEARCH_REPLACE = 'search/replace';
export const ACTION_SEARCH_SAVE_KEYWORD = 'search/saveKeyword';

export const REQUEST_GET_NOTIFICATION = 'api/notifications';

import Bootstrap from 'AINews/src/App/Bootstrap';

import images from '../../../assets/images';

const NOTI_TYPE = {
  NEW_SUB_COMMENT: 0,
  NEW_COMMENT: 1,
  NEW_POST_AUTHOR: 2,
  NEW_FOLLOWER: 3
};

export const getNotiIcon = type => {
  switch (type) {
    case NOTI_TYPE.NEW_SUB_COMMENT:
      return images.commentMini;
    case NOTI_TYPE.NEW_COMMENT:
      return images.commentMini;
    case NOTI_TYPE.NEW_POST_AUTHOR:
      return images.postMini;
    case NOTI_TYPE.NEW_FOLLOWER:
      return images.profileMini;

    default:
      return '';
  }
};

export const getNotiContent = type => {
  switch (type) {
    case NOTI_TYPE.NEW_SUB_COMMENT:
      return 'đã trả lời bình luận của bạn:';
    case NOTI_TYPE.NEW_COMMENT:
      return 'đã bình luận bài viết của bạn:';
    case NOTI_TYPE.NEW_POST_AUTHOR:
      return 'đã thêm bài viết mới';
    case NOTI_TYPE.NEW_FOLLOWER:
      return 'đang theo dõi bạn';

    default:
      return '';
  }
};

export const navigateNotification = (type, noti) => {
  const {
    data: { user, postId }
  } = noti;

  switch (type) {
    case NOTI_TYPE.NEW_SUB_COMMENT:
      if (postId) {
        return Bootstrap.push({
          component: {
            name: 'LinkedNewsDetails',
            passProps: {
              shouldLoadFullContent: true,
              id: noti.data.postId,
              autoShowKeyboard: false
            }
          }
        });
      }
      return '';
    case NOTI_TYPE.NEW_COMMENT:
      if (postId) {
        return Bootstrap.push({
          component: {
            name: 'LinkedNewsDetails',
            passProps: {
              shouldLoadFullContent: true,
              id: noti.data.postId,
              autoShowKeyboard: false
            }
          }
        });
      }
      return '';
    case NOTI_TYPE.NEW_POST_AUTHOR:
      if (postId) {
        return Bootstrap.push({
          component: {
            name: 'LinkedNewsDetails',
            passProps: {
              shouldLoadFullContent: true,
              id: noti.data.postId,
              autoShowKeyboard: false
            }
          }
        });
      }
      return '';
    case NOTI_TYPE.NEW_FOLLOWER:
      const id = user && user.id;
      if (id) {
        return Bootstrap.push({
          component: {
            name: 'Personal',
            passProps: {
              author: user
            }
          }
        });
      }
      return '';

    default:
      return '';
  }
};

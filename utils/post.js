import { Share, Platform } from 'react-native';
import appsFlyer from 'react-native-appsflyer';

import Bootstrap from 'AINews/src/App/Bootstrap';
import { t } from 'AINews/src/utils/LocalizationUtils';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { addBookmark, deleteBookmark } from 'AINews/src/store/actions/user';
import { APP_URL } from 'AINews/src/config';

export const sharePost = async postId => {
  // const loadingOverlayId = await Bootstrap.showLoadingOverlay(
  //   t('postInteract.sharing')
  // );

  // const args = {
  //   channel: 'AINewsApp',
  //   campaign: 'sharePost',
  //   userParams: {
  //     postId
  //   }
  // };

  // await Bootstrap.dismissLoadingOverlay(loadingOverlayId);
  const url = `${APP_URL}/post/${postId}`;

  if (Platform.OS === 'ios') {
    await Share.share({
      title: 'Share via',
      url
    });
  } else {
    await Share.share({
      title: 'Share via',
      message: url
    });
  }

  // appsFlyer.generateInviteLink(
  //   args,
  //   async url => {
  //     console.log('link generated', url);
  //     await Bootstrap.dismissLoadingOverlay(loadingOverlayId);
  //     if (Platform.OS === 'ios') {
  //       await Share.share({
  //         title: 'Share via',
  //         url
  //       });
  //     } else {
  //       await Share.share({
  //         title: 'Share via',
  //         message: url
  //       });
  //     }
  //   },
  //   () => {
  //     Bootstrap.dismissLoadingOverlay(loadingOverlayId);
  //   }
  // );
};

export const bookMarkPost = post => {
  const { saved, id } = post;

  if (id) {
    if (!saved) {
      callSagaRequest(addBookmark, { postId: id });
    } else {
      callSagaRequest(deleteBookmark, { postId: id });
    }
    Bootstrap.showToast({
      component: {
        name: 'Saved',
        passProps: {
          saved
        }
      }
    });
  }
};

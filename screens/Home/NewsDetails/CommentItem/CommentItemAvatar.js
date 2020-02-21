import React, { memo, useCallback, useRef } from 'react';
import { View, Image } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import images from '../../../../../assets/images';
import Bootstrap from '../../../../App/Bootstrap';

type Props = {
  user: {},
  sendingStatus?: String,
  disableShowPersonalPage?: boolean,
  isSmallSize?: boolean
};

const CommentItemAvatar = (props: Props) => {
  const { user, sendingStatus, disableShowPersonalPage, isSmallSize } = props;

  const _disableShowPersonalPage = useRef(disableShowPersonalPage);

  const showPersonalPage = useCallback(
    userId => {
      if (_disableShowPersonalPage.current) {
        return;
      }
      Bootstrap.push({
        component: {
          name: 'Personal',
          passProps: {
            author: user
            // isTab: false
          }
          // options: {
          //   topBar: {
          //     visible: false
          //   }
          // }
        }
      });
    },
    [user]
  );

  if (sendingStatus === 'failed') {
    return (
      <View>
        <DebounceTouch onPress={() => showPersonalPage(user.id)}>
          <ImageWithPlaceholder
            source={user && user.avatar ? { uri: user.avatar } : null}
            width={isSmallSize ? 24 : 44}
            height={isSmallSize ? 24 : 44}
            brs={isSmallSize ? 12 : 22}
            defaultImage={images.noAvatar}
            // resizeMode="contain"
          />
        </DebounceTouch>
        <View
          cls={`absolute ${
            isSmallSize ? 'wd-24 hg-24' : 'wd-44 hg-44'
          } b--reddish`}
          pointerEvents="none"
        >
          <View cls="absolute wd-10 hg-10 bottom-0 right-0 bg-white brs-7 aic jcc">
            <Image
              cls="wd-10 hg-10"
              source={images.error}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <DebounceTouch onPress={() => showPersonalPage(user.id)}>
      <ImageWithPlaceholder
        source={user && user.avatar ? { uri: user.avatar } : null}
        width={isSmallSize ? 24 : 44}
        height={isSmallSize ? 24 : 44}
        brs={isSmallSize ? 12 : 22}
        defaultImage={images.noAvatar}
        // resizeMode="contain"
      />
    </DebounceTouch>
  );
};

CommentItemAvatar.defaultProps = {
  sendingStatus: '',
  disableShowPersonalPage: false,
  isSmallSize: false
};

export default memo(
  wrap(CommentItemAvatar, 'defaultProps'),
  (prevProps: Props, nextProps: Props) =>
    prevProps.sendingStatus === nextProps.sendingStatus
);

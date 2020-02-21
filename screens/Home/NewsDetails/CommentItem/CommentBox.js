import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import { fixAndroidBoldCls } from 'AINews/src/utils/trivia';
import TextWithTag from 'AINews/src/elements/TextWithTag';

import Bootstrap from '../../../../App/Bootstrap';

type Props = {
  createdAt: String,
  user: {},
  content: String,
  sendingStatus: boolean,
  callback?: () => void
};

const CommentBox = (props: Props) => {
  const { createdAt, user, content, sendingStatus, callback } = props;

  function showTaggedUserPage(id) {
    Bootstrap.push({
      component: {
        name: 'Personal',
        passProps: {
          author: {
            // ...user
            id
          }
        }
      }
    });
  }

  function showPersonalPage() {
    Bootstrap.push({
      component: {
        name: 'Personal',
        passProps: {
          author: {
            ...user
          }
        }
      }
    });
  }

  return (
    <DebounceTouch activeOpacity={0.8} onPress={callback}>
      <View cls="">
        <View cls="bg-commentBox brs-12 pvn-8 phn-14">
          <View cls="flx-row">
            <DebounceTouch activeOpacity={0.8} onPress={showPersonalPage}>
              <Text cls="fs-13">
                <Text cls={fixAndroidBoldCls('commonBlack ff-sfSb')}>
                  {user.fullName}
                </Text>
              </Text>
            </DebounceTouch>
          </View>
          <View cls="hg-2" />
          <TextWithTag
            cls="fs-15 commonBlack fw3 ff-sfR"
            text={content}
            onTagPress={showTaggedUserPage}
          />
          {sendingStatus === 'failed' ? (
            <View cls="absolute-fill brs-18 bw-1 b--reddish" />
          ) : null}
        </View>
      </View>
    </DebounceTouch>
  );
};

CommentBox.defaultProps = {
  callback: () => {}
};

export default memo(
  wrap(CommentBox, 'defaultProps'),
  (prev: Props, next: Props) => prev.content === next.content && prev.sendingStatus === next.sendingStatus
);

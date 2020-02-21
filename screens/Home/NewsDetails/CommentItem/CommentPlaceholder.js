import React, { memo, useRef } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import { t } from 'AINews/src/utils/LocalizationUtils';
import CommentItemAvatar from './CommentItemAvatar';

type Props = {
  callback?: () => void,
  componentRef?: React.Ref
};

const CommentPlaceholder = (props: Props) => {
  const { callback, componentRef } = props;

  const profile = useSelector(state => state.me.profile);

  const containerRef = useRef();

  const { id, fullName, avatar } = profile;

  componentRef.current = {
    measure
  };

  function measure(...params) {
    if (containerRef.current) {
      containerRef.current.measure(...params);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={callback}>
      <View ref={containerRef} cls="flx-row">
        <View cls="ptn-6">
          <CommentItemAvatar
            isSmallSize
            user={{ id, fullName, avatar }}
            disableShowPersonalPage
          />
        </View>
        <View cls="wd-6" />
        <View cls="flx-i bw-1 b--commentPlaceholderBorder brs-20 hg-38 phn-12 jcc">
          <Text cls="commentPlaceholderText fs-14 ff-sfR">
            {t('newsDetails.enterReply')}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

CommentPlaceholder.defaultProps = {
  callback: () => { },
  componentRef: {}
};

export default memo(wrap(CommentPlaceholder, 'defaultProps'), () => true);

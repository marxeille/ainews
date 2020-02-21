import React, { useState, useRef } from 'react';
import { TouchableWithoutFeedback, View, Text, Image } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { wrap } from '@agiletechvn/react-theme';
import { t } from '../../../utils/LocalizationUtils';
import images from '../../../../assets/images';

type Props = {
  onFilterChanged: number => void
};

const CommentsFilters = ['top', 'newest'];

const CommentsFilter = (props: Props) => {
  const { onFilterChanged } = props;

  const [commentsFilter, setCommentsFilter] = useState(0);

  const actionSheetRef = useRef();

  function onCommentsFilterPress() {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  }

  function onCommentsFilterItemSelect(index) {
    if (index < 2) {
      setCommentsFilter(index);
      onFilterChanged(CommentsFilters[index]);
    }
  }

  return (
    <View cls="bg-white">
      <TouchableWithoutFeedback onPress={onCommentsFilterPress}>
        <View cls="phn-12 pvn-12 flx-row aic">
          <Text cls="fs-12">🔥</Text>
          <View cls="wd-5" />
          <Text cls="fs-11 ff-sfB">
            {t(`newsDetails.${CommentsFilters[commentsFilter]}`).toUpperCase()}
          </Text>
          <View cls="wd-8" />
          <Image
            cls="wd-10 hg-7"
            resizeMode="contain"
            source={images.chevronDown}
          />
        </View>
      </TouchableWithoutFeedback>
      <ActionSheet
        ref={actionSheetRef}
        title={t('newsDetails.commentsFilterTitle')}
        options={[
          t('newsDetails.top'),
          t('newsDetails.newest'),
          t('common.close')
        ]}
        cancelButtonIndex={2}
        onPress={onCommentsFilterItemSelect}
      />
    </View>
  );
};

export default wrap(CommentsFilter);

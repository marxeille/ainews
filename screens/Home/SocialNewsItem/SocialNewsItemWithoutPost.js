import React from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { t } from 'AINews/src/utils/LocalizationUtils';

const SocialNewsItemWithoutPost = () => (
  <View cls="pan-12">
    <Text cls="fs-14 ff-sf">{t('newsDetails.loadingContent')}</Text>
    <View cls="hg-22" />
  </View>
);
export default wrap(SocialNewsItemWithoutPost);

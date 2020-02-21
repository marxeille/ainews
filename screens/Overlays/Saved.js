import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { t } from 'AINews/src/utils/LocalizationUtils';
import colors from 'AINews/src/themes/colors';

type Props = {
  saved: Boolean
};

const Saved = ({ saved }: Props) => (
  <View cls="flx-i aic jcc">
    <View cls="wd-110 hg-110 bg-semiBlack brs-5 aic jcc">
      <Ionicons
        name={saved ? 'ios-close' : 'ios-save'}
        size={60}
        color={colors.white}
      />
      <View cls="hg-12" />
      <Text cls="fs-16 ff-sfB fw5 white">
        {saved ? t('common.unsaved') : t('common.saved')}
      </Text>
    </View>
  </View>
);

export default wrap(Saved);

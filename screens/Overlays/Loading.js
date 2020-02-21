import React from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

type Props = {
  text: String
};

const Saved = ({ text }: Props) => (
  <View cls="flx-i aic jcc">
    <View cls="ph3 pv3 bg-semiBlack brs-5 aic jcc">
      <Text cls="brandWhite ff-sfM">{text}</Text>
    </View>
  </View>
);

export default wrap(Saved);

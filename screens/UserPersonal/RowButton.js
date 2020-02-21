/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Row = ({ title, onPress, cls }) => (
  <DebounceTouch
    cls={['bg-white flx-row jcc aic hg-60', cls]}
    onPress={onPress}
  >
    <View cls="flx-i">
      <Text cls="ff-sfSb fs-14">{title}</Text>
    </View>
    <FontAwesome name="angle-right" size={24} cls="empty" />
  </DebounceTouch>
)

const RowButton = wrap(Row);

export default RowButton;

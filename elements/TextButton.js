import React from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from '../components/common/DebounceTouch';

type Props = {
  label?: String,
  callback?: () => void,
  active?: boolean,
  containerCls?: String,
  textCls?: String,
  containerActiveCls?: String,
  textActiveCls?: String
};

const TextButton = (props: Props) => {
  const {
    label,
    callback,
    active,
    containerCls,
    textCls,
    containerActiveCls,
    textActiveCls
  } = props;

  return (
    <DebounceTouch
      activeOpacity={0.6}
      onPress={callback}
      hitSlop={{ top: 10, bottom: 10 }}
    >
      <View cls={`${active ? containerActiveCls : containerCls}`}>
        <Text cls={`f6 ${active ? textActiveCls : textCls}`}>{label}</Text>
      </View>
    </DebounceTouch>
  );
};

TextButton.defaultProps = {
  label: '',
  callback: () => {},
  active: false,
  containerCls: '',
  textCls: '',
  containerActiveCls: '',
  textActiveCls: ''
};

export default wrap(TextButton, 'defaultProps');

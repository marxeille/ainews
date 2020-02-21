import React from 'react';
import { TouchableOpacity, Animated, ViewStyle } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

type AnimatedTextButtonProps = {
  label?: String,
  callback?: () => void,
  containerCls?: String,
  textCls?: String,
  containerStyle?: ViewStyle,
  textStyle?: ViewStyle
};

const AnimatedTextButton = (props: AnimatedTextButtonProps) => {
  const {
    label,
    callback,
    containerCls,
    textCls,
    containerStyle,
    textStyle
  } = props;

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={callback}>
      <Animated.View cls={`${containerCls}`} style={containerStyle}>
        <Animated.Text cls={`${textCls}`} style={textStyle}>
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

AnimatedTextButton.defaultProps = {
  label: '',
  callback: () => {},
  containerCls: '',
  textCls: '',
  containerStyle: {},
  textStyle: {}
};

export default wrap(AnimatedTextButton, 'defaultProps');

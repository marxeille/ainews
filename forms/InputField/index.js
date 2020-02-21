import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  NativeModules,
  findNodeHandle
} from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import colors from 'AINews/src/themes/colors';

@wrap
export default class InputField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.input = null;
  }

  componentDidMount() {
    const { input } = this.props;

    this.input.setNativeProps({ text: input.value });
  }

  componentDidUpdate() {
    const { input } = this.props;
    if (
      input
      && input.value !== null
      && input.value !== undefined
      && input.value.length === 0
      && this.input !== null
    ) {
      if (Platform.OS === 'android') {
        NativeModules.RNTextInputReset.resetKeyboardInput(
          findNodeHandle(this.input)
        );
      }
    }
  }

  handleFocus = () => {
    const { onFocusInput, onFocus } = this.props;

    onFocus && onFocus();
    onFocusInput && onFocusInput();
  };

  handleBlur = () => {
    const { onBlurInput, onBlur } = this.props;

    onBlur && onBlur();
    onBlurInput && onBlurInput();
  };

  render() {
    const {
      input,
      label,
      meta: { active, touched, error, warning },
      onPress,
      style,
      multiline,
      inputRef,
      keyboardType,
      inputStyle,
      containerStyle,
      valueFormat,
      onChangeText,
      maxLength,
      placeholderColor,
      editable = true,
      ...custom
    } = this.props;

    return (
      <View cls="pWd-100" style={[containerStyle]}>
        <View cls={['', { 'bw-1 b--reddish': error }]} style={[style]}>
          <TouchableOpacity
            cls={['pWd-100 flx-i', { aic: !multiline }]}
            onPress={onPress}
            activeOpacity={1}
          >
            <TextInput
              keyboardType={keyboardType}
              ref={ref => {
                this.input = ref;
                inputRef && inputRef(ref);
              }}
              multiline={multiline}
              underlineColorAndroid="#00000000"
              placeholder={label}
              maxLength={maxLength}
              placeholderTextColor={placeholderColor || colors.commonBlack}
              // value={valueFormat ? valueFormat(input.value) : input.value}
              {...custom}
              onChangeText={text => {
                this.input.setNativeProps({ text });
                input.onChange(text);
                if (onChangeText) {
                  return onChangeText(text, input);
                }
              }}
              onFocus={this.handleFocus}
              editable={editable}
              onBlur={this.handleBlur}
              cls="pWd-100 flx-i pv1 mv0"
              style={[
                inputStyle,
                { minHeight: undefined, textAlignVertical: 'top' }
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import debounce from 'lodash.debounce';

class Touch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onPress = debounce(this.onPress.bind(this), 250, {
      leading: true,
      trailing: false
    })
  }

  onPress() {
    this.props.onPress && this.props.onPress();
  }

  render() {
    return (
      <TouchableOpacity {...this.props} onPress={this.onPress}>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

const DebounceTouch = wrap(Touch);

export default DebounceTouch;

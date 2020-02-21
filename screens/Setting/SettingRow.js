import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

type Props = {
  onPress: Function,
  leftTitle: String,
  rightTitle: String,
  children: React.Node
};

class SettingRow extends PureComponent<Props> {
  onRowPress = () => {
    const { onPress } = this.props;

    onPress && onPress();
  };

  render() {
    const { leftTitle, children, rightTitle } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onRowPress}
        cls="flx-row fullWidth jcsb aic hg-60"
      >
        <View cls="jcc">
          <Text cls="fs-14 secondary fw6">{leftTitle}</Text>
        </View>
        <View cls="flx-row aic">
          {rightTitle ? (
            <Text cls="fs-14 secondary fw6">{rightTitle}</Text>
          ) : null}
          {children || null}
        </View>
      </TouchableOpacity>
    );
  }
}

export default compose(wrap)(SettingRow);

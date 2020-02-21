import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

type Props = {
  author: Object
};

class AboutTab extends PureComponent<Props> {
  render() {
    const { author } = this.props;
    return (
      <View cls="flx-i">
        <ScrollView cls="flx-i" contentContainerCls="ph3">
          <Text>{author.about}</Text>
        </ScrollView>
      </View>
    );
  }
}

export default wrap(AboutTab);

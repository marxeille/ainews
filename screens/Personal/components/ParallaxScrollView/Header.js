import React, { PureComponent } from 'react';
import { View, StatusBar, Platform } from 'react-native';

type Props = {
  renderNavBar: Function,
  renderStickyNavBar: Function,
  author: Object,
  profile: Object
};

export default class RNParallaxHeader extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      stickyHeader: false
    };
  }

  renderLightNav = () => {
    if (this.state.stickyHeader) {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
      }

      this.setState({
        stickyHeader: false
      });
    }
  };

  renderStickyNav = () => {
    if (!this.state.stickyHeader) {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('dark-content');
      }

      this.setState({
        stickyHeader: true
      });
    }
  };

  render() {
    const { stickyHeader } = this.state;
    const {
      renderNavBar, renderStickyNavBar, author, profile
    } = this.props;
    return (
      <View pointerEvents="box-none">
        {stickyHeader
          ? renderStickyNavBar(author, profile)
          : renderNavBar(author, profile)}
      </View>
    );
  }
}

/**
 * @flow
 */

import React from 'react';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { wrap } from '@agiletechvn/react-theme';
import colors from 'AINews/src/themes/colors';

import HomeCore from './HomeCore';
import images from '../../../assets/images';

class Home extends React.Component {
  static options() {
    return {
      topBar: {
        visible: false,
        height: 0
      },
      statusBar: {
        visible: true,
        style: 'dark'
      }
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  componentDidAppear() {
    if (Platform.OS === 'ios') {
      // StatusBar.setBarStyle('dark-content', true);
      Navigation.mergeOptions(this.props.componentId, {
        bottomTab: {
          selectedTextColor: colors.reddish,
          textColor: colors.tabBarGrey,
          fontFamily: 'SFProText-Bold',
          icon: images.home,
          selectedIcon: images.homeSelected,
          text: 'Tin tức'
        }
      });
    } else {
      // StatusBar.setBarStyle('dark-content', true);
      // StatusBar.setBackgroundColor('white');
    }
  }

  render() {
    // return null;
    return <HomeCore {...this.props} />;
  }
}

export default wrap(Home);

import React from 'react';
import { StatusBar, Platform, View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Navigation } from 'react-native-navigation';
import { wrap } from '@agiletechvn/react-theme';
import colors from 'AINews/src/themes/colors';
import images from '../../../assets/images';
import PersonalCore from './PersonalCore';

type Props = {
  nightMode: Boolean
};

class Personal extends React.Component<Props> {
  static options() {
    return {
      topBar: {
        noBorder: true,
        visible: true,
        backButton: {
          icon: images.back,
          color: colors.commonGrey
        }
        // rightButtons: [
        //   {
        //     id: 1,
        //     icon: images.report
        //   },
        //   {
        //     id: 0,
        //     icon: images.share
        //   }
        // ]
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
    } else {
      // StatusBar.setBarStyle('dark-content');
      // StatusBar.setBackgroundColor('transparent');
    }
  }

  componentDidDisappear() {
    const { nightMode } = this.props;

    if (Platform.OS === 'ios' && !nightMode) {
      // StatusBar.setBarStyle('dark-content', true);
    } else {
      // StatusBar.setBarStyle('dark-content');
      // StatusBar.setBackgroundColor('white');
    }
  }

  render() {
    return <PersonalCore {...this.props} />;
  }
}

export default compose(
  connect(state => ({
    nightMode: state.themes.nightMode
  })),
  wrap
)(Personal);

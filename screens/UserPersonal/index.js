import React from 'react';
import { useSelector } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import { View, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';

import colors from 'AINews/src/themes/colors';
import images from 'AINews/assets/images';

import Login from '../Login';
import PersonalProfile from './PersonalProfile';

const PersonalComponent = () => {
  const token = useSelector(state => state.token.token);
  const me = useSelector(state => state.me);

  if (!token) {
    return (
      <View cls="msbh flx-i">
        <Login />
      </View>
    );
  }

  return (
    <View cls="msbh flx-i">
      <PersonalProfile me={{ author: me.profile }} />
    </View>
  );
};

const UserPersonal = wrap(PersonalComponent);

class TabUser extends React.PureComponent {
  static options() {
    return {
      topBar: {
        noBorder: true,
        visible: true
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
          icon: images.personal,
          selectedIcon: images.personalSelected,
          text: 'Cá nhân'
        }
      });
    } else {
      // StatusBar.setBarStyle('dark-content', true);
      // StatusBar.setBackgroundColor('white');
    }
  }

  render() {
    return <UserPersonal />;
  }
}

export default wrap(TabUser);

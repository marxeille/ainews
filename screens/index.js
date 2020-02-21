/**
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Home from './Home';
import Video from './Video';
import Follows from './Follows';
import Personal from './Personal';
import CategoriesSelect from './CategoriesSelect';
import Login from './Login';
import Register from './Login/Register';
import OTP from './Login/OTP';
import UpdateInfo from './Login/UpdateInfo';
import ForgotPassword from './Login/ForgotPassword';
import SocialNewsDetails from './Home/SocialNewsItem/SocialNewsDetails';
import CommonNewsDetails from './Home/CommonNewsItem/CommonNewsDetails';
import NewsDetailsList from './NewsDetailsList';
import Setting from './Setting';
import PhotoListDetails from './Home/PhotoListDetails';
import PersonalEdit from './PersionalEdit';
import CategoryConfiguration from './Setting/CategoryConfiguration';
import NavigationContext from '../components/common/NavigationContext';
import Saved from './Overlays/Saved';
import Loading from './Overlays/Loading';
import SavedPosts from './SavedPosts';
import HomeSearch from './Home/HomeSearch';
import HomeSearchByType from './Home/HomeSearchByType';
import GroupNewsFeed from './Home/GroupNewsFeed';
import LinkedNewsDetails from '../LinkedNewsDetails';
import UserPersonal from './UserPersonal';
import PersonalPosts from './UserPersonal/PersonalPosts';
import PersonalComments from './UserPersonal/PersonalComments';
import PersonalSaved from './UserPersonal/PersonalSaved';
import Notification from './Notification';
import NewsDetailHeader from '../components/NewsDetailHeader';
import EmptyView from '../components/EmptyView';
import TermOfUse from './TermOfUse';
import Policy from './Policy';

type NavigationComponent = {
  name: string,
  component: React.Component | React.PureComponent
};

const registerNavigationComponents = (store, provider) => {
  withStatusBarScreens.forEach((screen: NavigationComponent) => {
    registerScreenWithStatusBar(screen, store, provider);
  });
  withoutStatusBarScreens.forEach((screen: NavigationComponent) => {
    registerScreenWithoutStatusBar(screen, store, provider);
  });
  standaloneComponents.forEach((component: NavigationComponent) => {
    registerStandaloneComponent(component);
  });
};

/**
 * Note that Navigation.registerComponentWithRedux is deprecated
 */

const registerScreenWithStatusBar = (
  { name, component }: NavigationComponent,
  store,
  provider
) => {
  Navigation.registerComponent(
    name,
    () => withComponentId(withStatusBar(component, store, provider)),
    () => component
  );
};

const registerScreenWithoutStatusBar = (
  { name, component }: NavigationComponent,
  store,
  provider
) => {
  Navigation.registerComponent(
    name,
    () => withComponentId(withoutStatusBar(component, store, provider)),
    () => component
  );
};

const registerStandaloneComponent = ({
  name,
  component
}: NavigationComponent) => {
  Navigation.registerComponent(name, () => component);
};

function withStatusBar(
  Component: React.Component | React.PureComponent,
  store,
  Provider
) {
  class WrappedScreen extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <Component {...this.props} />
          </View>
        </Provider>
      );
    }
  }
  WrappedScreen.options = Component.options;
  return WrappedScreen;
}

function withoutStatusBar(
  Component: React.Component | React.PureComponent,
  store,
  Provider
) {
  class WrappedScreen extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Component {...this.props} />
        </Provider>
      );
    }
  }
  WrappedScreen.options = Component.options;
  return WrappedScreen;
}

function withComponentId(Component: React.Component | React.PureComponent) {
  type Props = {
    componentId: String
  };

  class WrappedScreen extends React.Component<Props> {
    render() {
      const { componentId } = this.props;
      return (
        <NavigationContext.Provider value={{ componentId }}>
          <Component {...this.props} />
        </NavigationContext.Provider>
      );
    }
  }
  WrappedScreen.options = Component.options;
  return WrappedScreen;
}

const withStatusBarScreens: [NavigationComponent] = [
  {
    name: 'Login',
    component: Login
  },
  {
    name: 'Register',
    component: Register
  },
  {
    name: 'Home',
    component: Home
  },
  {
    name: 'Video',
    component: Video
  },
  {
    name: 'Notification',
    component: Notification
  },
  {
    name: 'Follows',
    component: Follows
  },
  {
    name: 'OTP',
    component: OTP
  },
  {
    name: 'SavedPosts',
    component: SavedPosts
  },
  {
    name: 'UpdateInfo',
    component: UpdateInfo
  },
  {
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    name: 'GroupNewsFeed',
    component: GroupNewsFeed
  },
  {
    name: 'LinkedNewsDetails',
    component: LinkedNewsDetails
  },
  {
    name: 'TermOfUse',
    component: TermOfUse
  },
  {
    name: 'Policy',
    component: Policy
  }
];

const withoutStatusBarScreens: [NavigationComponent] = [
  {
    name: 'NewsDetailsList',
    component: NewsDetailsList
  },
  {
    name: 'Saved',
    component: Saved
  },
  {
    name: 'Loading',
    component: Loading
  },
  {
    name: 'NewsDetailHeader',
    component: NewsDetailHeader
  },
  {
    name: 'EmptyView',
    component: EmptyView
  },
  {
    name: 'CategoriesSelect',
    component: CategoriesSelect
  },
  {
    name: 'CommonNewsDetails',
    component: CommonNewsDetails
  },
  {
    name: 'SocialNewsDetails',
    component: SocialNewsDetails
  },
  {
    name: 'Personal',
    component: Personal
  },
  {
    name: 'PhotoListDetails',
    component: PhotoListDetails
  },
  {
    name: 'PersonalEdit',
    component: PersonalEdit
  },
  {
    name: 'CategoryConfiguration',
    component: CategoryConfiguration
  },
  {
    name: 'Setting',
    component: Setting
  },
  {
    name: 'HomeSearch',
    component: HomeSearch
  },
  {
    name: 'HomeSearchByType',
    component: HomeSearchByType
  },
  {
    name: 'UserPersonal',
    component: UserPersonal
  },
  {
    name: 'PersonalPosts',
    component: PersonalPosts
  },
  {
    name: 'PersonalComments',
    component: PersonalComments
  },
  {
    name: 'PersonalSaved',
    component: PersonalSaved
  }
];

const standaloneComponents: [NavigationComponent] = [];

export default registerNavigationComponents;

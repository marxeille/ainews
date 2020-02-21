/**
 * @flow
 */

import React from 'react';
import { View, Platform } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import HomeHeader from './HomeHeader';
// import CodePushComponent from '../../components/common/CodePushComponent';

const Home = () => (
  <View cls="flx-i">
    {/* {__DEV__ && Platform.OS === 'ios' ? null : <CodePushComponent />} */}
    {/* {Platform.OS 'android' && <CodePushComponent />} */}
    <HomeHeader />
  </View>
);

export default wrap(Home);

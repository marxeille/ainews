import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const statusBar = {
  psbh: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0
  },
  msbh: {
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0
  }
};

export { statusBar };

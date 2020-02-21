import React from 'react';

import { wrap } from '@agiletechvn/react-theme';

import LoginCore from './LoginCore';

import images from '../../../assets/images';
import colors from '../../themes/colors';

class Login extends React.Component {
  render() {
    return <LoginCore {...this.props} />;
  }
}

Login.options = () => ({
  topBar: {
    backButton: {
      icon: images.back,
      color: colors.commonGrey
    }
  }
});

export default wrap(Login, 'options');

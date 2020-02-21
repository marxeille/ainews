import React from 'react';

import { wrap } from '@agiletechvn/react-theme';

import NewsDetailsList from './NewsDetailsList';

import images from '../../../assets/images';
import colors from '../../themes/colors';

class NewsDetailsListScreen extends React.Component {
  render() {
    return <NewsDetailsList {...this.props} />;
  }
}

NewsDetailsListScreen.options = () => ({
  topBar: {
    backButton: {
      icon: images.back,
      color: colors.commonGrey
    }
    // rightButtons: [
    //   {
    //     id: 2,
    //     icon: images.report
    //   },
    //   {
    //     id: 1,
    //     icon: images.bookmark
    //   },
    //   {
    //     id: 0,
    //     icon: images.share
    //   }
    // ]
  }
});

export default wrap(NewsDetailsListScreen, 'options');

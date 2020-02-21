import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { View, Text, Alert } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { connect } from 'react-redux';

import Bootstrap from 'AINews/src/App/Bootstrap';
import { t } from 'AINews/src/utils/LocalizationUtils';
import { logout } from 'AINews/src/store/actions/auth';
import { resetAuthors } from 'AINews/src/store/actions/authors';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import * as onesignalUtils from 'AINews/src/utils/onesignal';

import { callSagaRequest } from '../../utils/RequestHandler';
import {
  removeRefreshToken,
  removeAccessToken
} from '../../utils/RequestSagaUtils/token/actions';

type Props = {
  profile: Object
};

class LogoutButton extends PureComponent<Props> {
  onLogoutPress = () => {
    Alert.alert(
      t('personal.logoutWarningTitle'),
      t('personal.logoutWarningContent'),
      [
        {
          text: t('personal.logout'),
          onPress: () => {
            callSagaRequest(removeRefreshToken);
            callSagaRequest(removeAccessToken);
            callSagaRequest(logout);
            callSagaRequest(resetAuthors);
            onesignalUtils.deleteTags();
            Bootstrap.popToRoot();
          },
          style: 'destructive'
        },
        {
          text: t('common.back'),
          style: 'default'
        }
      ]
    );
  };

  render() {
    const { profile } = this.props;
    if (profile.isAnonymous) {
      return <View />;
    }

    return (
      <DebounceTouch
        onPress={this.onLogoutPress}
        activeOpacity={0.7}
        cls="jcc aic fullWidth"
      >
        <View cls="ptn-20 pbn-21 phn-20 bg-white jcc aic fullWidth">
          <Text cls="fs-14 reddish fw6">{t('personal.logout')}</Text>
        </View>
        <View cls="hg-16" />
      </DebounceTouch>
    );
  }
}

export default compose(
  connect(state => ({
    profile: state.me.profile
  })),
  wrap
)(LogoutButton);

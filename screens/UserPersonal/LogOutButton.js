import React from 'react';
import { Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import { t } from 'AINews/src/utils/LocalizationUtils';
import { removeRefreshToken, removeAccessToken } from 'AINews/src/utils/RequestSagaUtils/token/actions';
import { logout } from 'AINews/src/store/actions/auth';
import { resetAuthors } from 'AINews/src/store/actions/authors';

const LogOut = () => {
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  function onLogOutPress() {
    Alert.alert(
      t('personal.logoutWarningTitle'),
      t('personal.logoutWarningContent'),
      [
        {
          text: t('personal.logout'),
          onPress: () => {
            dispatch(removeRefreshToken());
            dispatch(removeAccessToken());
            dispatch(logout());
            dispatch(resetAuthors());
          },
          style: 'destructive'
        },
        {
          text: t('common.back'),
          style: 'default'
        }
      ]
    );
  }

  if (!token) {
    return null;
  }

  return (
    <DebounceTouch
      cls="bg-white flx-row jcc aic hg-60 mtn-32 bwh btw-0 blw-0 brw-0 b--empty"
      onPress={onLogOutPress}
    >
      <Text cls="ff-sfB fs-14 reddish">{t('personal.logout')}</Text>
    </DebounceTouch>
  );
}

const LogOutButton = wrap(LogOut);

export default LogOutButton;

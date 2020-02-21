import React from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { t } from 'AINews/src/utils/LocalizationUtils';
import Bootstrap from 'AINews/src/App/Bootstrap';

import LogOutButton from './LogOutButton';
import MyFeedButton from './MyFeedButton';
import ChangeThemeButton from './ChangeThemeButton';
import RowButton from './RowButton';

const Setting = () => {
  function onLinkToPolicy() {
    Bootstrap.push({
      component: {
        name: 'Policy'
      }
    });
  }

  return (
    <View cls="flx-i bg-settingBackground">
      <View cls="bg-white ptn-18 phn-20 mtn-10 bwh btw-0 blw-0 brw-0 b--empty">
        <Text cls="ff-sfB fs-12 categoryTitle mbn-10">
          {t('personal.myFeeds')}
        </Text>
        <MyFeedButton />
      </View>
      {/* <View
      cls="bg-white ptn-18 phn-20 mtn-10 bwh btw-0 blw-0 brw-0 b--empty"
    >
      <Text cls="ff-sfB fs-12 categoryTitle mbn-10">{t('personal.appSettings')}</Text>
      <ChangeThemeButton />
    </View> */}
      <View cls="mtn-10 bwh btw-0 blw-0 brw-0 b--empty">
        <RowButton
          cls="phn-20"
          title={t('personal.supportAndLegal')}
          onPress={onLinkToPolicy}
        />
      </View>
      <LogOutButton />
    </View>
  );
};

const PersonalSetting = wrap(Setting);

export default PersonalSetting;

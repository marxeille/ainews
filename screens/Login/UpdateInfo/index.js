import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import Bootstrap from 'AINews/src/App/Bootstrap';
import { t } from '../../../utils/LocalizationUtils';
import colors from '../../../themes/colors';
import InputField from '../elements/InputField';
import TextButton from '../../../elements/TextButton';
import { callSagaRequestWithErrorHandler } from '../../../utils/RequestHandler';
import { updateRegisterInfo } from '../../../store/actions/auth';

type Props = {
  accessToken: String
};

const UpdateInfo = (props: Props) => {
  const { accessToken } = props;

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const categories = useSelector(state => state.categories.categories);

  async function onFinishPress () {
    try {
      const followingCategoryIds = categories.map(category => category.id);

      await callSagaRequestWithErrorHandler(updateRegisterInfo, {
        accessToken,
        fullName,
        password,
        followingCategoryIds
      });
      Alert.alert(
        t('registerInfo.updateInfoSucceedsAlertTitle'),
        t('registerInfo.updateInfoSucceedsAlertContent'),
        [
          {
            text: t('common.OK'),
            onPress: async () => {
              // this is a hack
              Bootstrap.pop();
              Bootstrap.pop();
            }
          }
        ]
      );
    } catch (err) {
      console.log('UpdateInfo/onFinishPress error', err);
    }
  }

  return (
    <View cls="flx-i phn-20">
      <View style={{ height: '7%' }} />
      <View cls="mhnNeg-20 flx-row">
        <View cls="wd-4 bg-reddish" />
        <View cls="wd-16" />
        <Text cls="fs-32 fw6 blackish">{t('registerInfo.title')}</Text>
      </View>
      <View style={{ height: '1%' }} />
      <Text cls="fs-16 greyish">{t('registerInfo.subtitle')}</Text>
      <View style={{ height: '2%' }} />
      <InputField
        autoFocus
        placeholder={t('registerInfo.fullName')}
        placeholderTextColor={colors.loginTextInputPlaceholder}
        value={fullName}
        onChangeText={value => setFullName(value)}
      />
      <View style={{ height: '2%' }} />
      <InputField
        placeholder={t('registerInfo.password')}
        placeholderTextColor={colors.loginTextInputPlaceholder}
        value={password}
        onChangeText={value => setPassword(value)}
        secureTextEntry
      />
      <View style={{ height: '4%' }} />
      <View cls="phn-20">
        <TextButton
          label={t('registerInfo.finish')}
          containerCls="bg-loginButtonBackground ptn-15 pbn-14 brs-2"
          textCls="tc fs-16 fw6 loginButtonText"
          callback={onFinishPress}
        />
      </View>
    </View>
  );
};

export default wrap(UpdateInfo);

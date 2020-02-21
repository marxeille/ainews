import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
// import { useSelector } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import Bootstrap from 'AINews/src/App/Bootstrap';
import { t } from '../../utils/LocalizationUtils';
import colors from '../../themes/colors';
import InputField from './elements/InputField';
import TextButton from '../../elements/TextButton';
import { callSagaRequestWithErrorHandler } from '../../utils/RequestHandler';
import { forgotPassword } from '../../store/actions/auth';

type Props = {
  accessToken: String
};

const ForgotPassword = (props: Props) => {
  const { accessToken } = props;

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  async function onSubmitPress () {
    try {
      if (password !== passwordConfirmation) {
        Alert.alert(
          t('forgotPassword.passwordsNotMatchingErrorTitle'),
          t('forgotPassword.passwordsNotMatchingErrorContent')
        );
        return;
      }

      await callSagaRequestWithErrorHandler(forgotPassword, {
        accessToken,
        newPassword: password
      });
      Alert.alert(
        t('forgotPassword.resetPasswordSucceedsAlertTitle'),
        t('forgotPassword.resetPasswordSucceedsAlertContent'),
        [
          {
            text: t('common.OK'),
            onPress: async () => {
              Bootstrap.pop();
            }
          }
        ]
      );
    } catch (err) {
      Alert.alert(
        t('forgotPassword.reportErrorTitle'),
        t('forgotPassword.reportErrorDescription')
      );
    }
  }

  return (
    <View cls="flx-i phn-20">
      <View style={{ height: '7%' }} />
      <View cls="mhnNeg-20 flx-row">
        <View cls="wd-4 bg-reddish" />
        <View cls="wd-16" />
        <Text cls="fs-32 fw6 blackish">{t('forgotPassword.title')}</Text>
      </View>
      <View style={{ height: '1%' }} />
      <Text cls="fs-16 greyish">{t('forgotPassword.subtitle')}</Text>
      <View style={{ height: '2%' }} />
      <InputField
        autoFocus
        placeholder={t('forgotPassword.password')}
        placeholderTextColor={colors.loginTextInputPlaceholder}
        value={password}
        onChangeText={value => setPassword(value)}
        secureTextEntry
      />
      <View style={{ height: '2%' }} />
      <InputField
        placeholder={t('forgotPassword.confirmPassword')}
        placeholderTextColor={colors.loginTextInputPlaceholder}
        value={passwordConfirmation}
        onChangeText={value => setPasswordConfirmation(value)}
        secureTextEntry
      />
      <View style={{ height: '4%' }} />
      <View cls="phn-20">
        <TextButton
          label={t('forgotPassword.submit')}
          containerCls="bg-loginButtonBackground ptn-15 pbn-14 brs-2"
          textCls="tc fs-16 fw6 loginButtonText"
          callback={onSubmitPress}
        />
      </View>
    </View>
  );
};

export default wrap(ForgotPassword);

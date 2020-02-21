import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { t } from '../../../utils/LocalizationUtils';
import PhoneNumberInput from '../elements/PhoneNumberInput';
import TextButton from '../../../elements/TextButton';
import { registerWithPhone } from '../../../store/actions/auth';
import { callSagaRequestWithErrorHandler } from '../../../utils/RequestHandler';
import Bootstrap from '../../../App/Bootstrap';

type Props = {};

const Register = (props: Props) => {
  const [phone, setPhone] = useState('');

  function onPhoneInputChanged(input) {
    setPhone(input);
  }

  async function onSendOTPPress() {
    try {
      await callSagaRequestWithErrorHandler(registerWithPhone, { phone });
      Bootstrap.push({
        component: {
          name: 'OTP',
          passProps: {
            phone,
            cooldown: 60,
            numOfDigits: 4
          }
        }
      });
    } catch (err) {
      console.log('Register/onSendOTPPress error', err);
    }
  }

  return (
    <View cls="flx-i ptn-16 pbn-32 phn-20">
      <View cls="hg-60" />
      <View cls="mhnNeg-20 flx-row">
        <View cls="wd-4 bg-reddish" />
        <View cls="wd-16" />
        <Text cls="fs-32 fw6 blackish">{t('register.title')}</Text>
      </View>
      <View cls="hg-8" />
      <Text cls="fs-16 greyish">{t('register.subtitle')}</Text>
      <View cls="hg-36" />
      <PhoneNumberInput
        withSeparator
        withPlaceholder
        onInputChanged={onPhoneInputChanged}
      />
      <View cls="hg-1 bg-loginTextInputUnderline" />
      <View cls="hg-42" />
      <View cls="phn-20 flx-i">
        <TextButton
          label={t('register.sendOTP')}
          containerCls="bg-loginButtonBackground ptn-15 pbn-14 brs-2"
          textCls="tc fs-16 fw6 loginButtonText"
          callback={onSendOTPPress}
        />
        <View cls="flx-i" />
        <TextButton
          containerCls="ptn-15 pbn-14 bg-loginWithFacebook brs-2"
          textCls="fs-16 white fw6 tc"
          label={t('login.loginWithFacebook')}
        />
      </View>
    </View>
  );
};

export default wrap(Register);

import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { t } from '../../../utils/LocalizationUtils';
import OTPInput from '../elements/OTPInput';
import TextButton from '../../../elements/TextButton';
import {
  registerWithPhone,
  verifyWithPhone
} from '../../../store/actions/auth';
import { callSagaRequestWithErrorHandler } from '../../../utils/RequestHandler';
import Bootstrap from '../../../App/Bootstrap';

type Props = {
  phone: String,
  cooldown: number,
  numOfDigits: Number
};

const OTP = (props: Props) => {
  const { phone, cooldown, numOfDigits } = props;

  const [timeLeft, setTimeLeft] = useState(0);

  const otpInputRef = useRef();

  useEffect(() => {
    let countDownSchedule;
    if (timeLeft > 0) {
      countDownSchedule = setTimeout(() => {
        setTimeLeft(tl => tl - 1);
      }, 1000);
    }

    return () => {
      if (countDownSchedule) {
        clearTimeout(countDownSchedule);
      }
    };
  }, [timeLeft]);

  async function onResendPress() {
    setTimeLeft(cooldown);
    try {
      await callSagaRequestWithErrorHandler(registerWithPhone, { phone });
    } catch (err) {
      console.log('OTP/resend error', err);
    }
  }

  async function onOTPInputSubmit(otp) {
    if (otpInputRef.current) {
      try {
        const result = await callSagaRequestWithErrorHandler(verifyWithPhone, {
          phone,
          otp
        });
        const { registerCode } = result;
        Bootstrap.push({
          component: {
            name: 'UpdateInfo',
            passProps: {
              registerCode
            }
          }
        });
      } catch (err) {
        console.log('OTP/onOTPInputSubmit error', err);
      } finally {
        otpInputRef.current.reset();
      }
    }
  }

  return (
    <View cls="flx-i ptn-61 phn-20">
      <Text cls="fs-32 fw6 blackish">{t('otp.title')}</Text>
      <View cls="hg-7" />
      <Text cls="fs-16 greyish">{`${t('otp.subtitle')} ${phone}`}</Text>
      <View cls="hg-43" />
      <OTPInput
        otpInputRef={otpInputRef}
        onSubmit={onOTPInputSubmit}
        numOfDigits={numOfDigits}
      />
      <View cls="hg-24" />
      <View cls="aic">
        {timeLeft > 0 ? (
          <Text cls="tc lightGreyish fs-16">
            {`${t('otp.resendIn')} ${timeLeft}s`}
          </Text>
        ) : (
          <TextButton
            containerCls=""
            textCls=""
            label={t('otp.resend')}
            callback={onResendPress}
          />
        )}
      </View>
    </View>
  );
};

export default wrap(OTP);

import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

type Props = {
  otpInputRef: {},
  onSubmit: String => void,
  numOfDigits: number
};

const OTPInput = (props: Props) => {
  const { otpInputRef, onSubmit, numOfDigits } = props;

  const [otp, setOtp] = useState('');

  function onOTPInputChange(value) {
    const standardizedValue = value.replace(/\D/g, '').slice(0, numOfDigits);
    setOtp(standardizedValue);
    if (standardizedValue.length === numOfDigits) {
      onSubmit(standardizedValue);
    }
  }

  otpInputRef.current = {
    reset
  };

  function reset() {
    setOtp('');
  }

  return (
    <View cls="flx-row jcsb">
      <TextInput
        keyboardType="numeric"
        autoFocus
        cls="wd-0 hg-0 absolute"
        value={otp}
        onChangeText={onOTPInputChange}
      />
      {Array(numOfDigits)
        .fill()
        .map((value, index) => (
          <View
            key={index}
            cls={`wd-60 hg-40 ${
              index === otp.length ? 'b--reddish' : 'b--separatingLine'
            } aic jcc btw-0 bbw-2 blw-0 brw-0`}
          >
            <Text cls="fs-26 fw6">{otp.charAt(index)}</Text>
          </View>
        ))}
    </View>
  );
};

export default wrap(OTPInput);

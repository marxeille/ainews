import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import colors from '../../../themes/colors';
import { t } from '../../../utils/LocalizationUtils';

type Props = {
  onInputChanged: String => void,
  withSeparator: boolean,
  withPlaceholder: boolean
};

const PhoneNumberInput = (props: Props) => {
  const { onInputChanged, withSeparator, withPlaceholder } = props;

  const userLocalCountryCode = 'vn';

  const [phoneNumber, setPhoneNumber] = useState();
  const [cca2, setcca2] = useState(userLocalCountryCode);

  const countryPickerRef = useRef();
  const phoneCountryCodeRef = useRef();
  const phoneNumberRef = useRef();

  useEffect(() => {
    if (phoneCountryCodeRef) {
      onInputChanged(
        `+${phoneCountryCodeRef.current.getCountryCode()}${phoneNumber}`
      );
    }
  }, [cca2, onInputChanged, phoneNumber]);

  function onPressFlag() {
    if (countryPickerRef.current) {
      countryPickerRef.current.openModal();
    }
  }

  function selectCountry(country) {
    if (phoneCountryCodeRef.current && phoneNumberRef.current) {
      phoneCountryCodeRef.current.selectCountry(country.cca2.toLowerCase());
      setcca2(country.cca2);
      phoneNumberRef.current.focus();
    }
  }

  return (
    <View cls="flx-row asc">
      <PhoneInput
        ref={phoneCountryCodeRef}
        initialCountry={userLocalCountryCode.toLowerCase()}
        style={{ paddingVertical: 8 }}
        textStyle={{
          fontSize: 24,
          color: colors.blackish,
          height: null
        }}
        onPressFlag={onPressFlag}
      />
      {withSeparator ? (
        <View cls="jcfe pln-7 pbn-8 prn-11">
          <View
            cls="wd-0 hg-0 b--transparent bs-solid brw-2 btw-2 blw-2 bbw-2"
            style={{
              borderRightColor: colors.blackish,
              borderBottomColor: colors.blackish
            }}
          />
        </View>
      ) : null}
      <TextInput
        ref={phoneNumberRef}
        placeholder={withPlaceholder ? t('register.phoneInput') : null}
        placeholderTextColor={colors.textInputPlaceHolder}
        cls="fs-24 blackish flx-i pvn-8"
        keyboardType="number-pad"
        value={phoneNumber}
        onChangeText={(value) => {
          const standardizedValue = value.replace(/^0+/, '').replace(/\D/g, '');
          setPhoneNumber(standardizedValue);
        }}
      />
      <CountryPicker
        styles={{ borderWidth: 3, borderColor: 'red' }}
        ref={countryPickerRef}
        cca2={cca2}
        onChange={value => selectCountry(value)}
      >
        <View />
      </CountryPicker>
    </View>
  );
};

export default wrap(PhoneNumberInput);

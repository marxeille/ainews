import React, { useState, useEffect } from 'react';
import { View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import RNAccountKit from 'react-native-facebook-account-kit';
import Bootstrap from 'AINews/src/App/Bootstrap';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import {
  forgotPassword,
  loginWithPhone,
  loginWithFacebook
} from 'AINews/src/store/actions/auth';
import HTTPRequestError from 'AINews/src/utils/RequestSagaUtils/errors/HTTPRequestError';
import { showConfirmAlert, fixAndroidBoldCls } from 'AINews/src/utils/trivia';

import images from '../../../assets/images';
import { t } from '../../utils/LocalizationUtils';
import TextButton from '../../elements/TextButton';
import colors from '../../themes/colors';
import PhoneNumberInput from './elements/PhoneNumberInput';
import InputField from './elements/InputField';
import {
  callSagaRequest,
  callSagaRequestWithErrorHandler
} from '../../utils/RequestHandler';

function Login() {
  const [password, setPassword] = useState('');

  const [phone, setPhone] = useState('');
  const [termOfUseStatus, setTermOfUseStatus] = useState(true);

  const categories = useSelector(state => state.categories.categories);

  useEffect(() => {
    RNAccountKit.configure({
      initialPhoneCountryPrefix: '+84',
      countryWhitelist: ['US', 'VN'],
      setEnableInitialSmsButton: true
    });
  }, []);

  function checkTermOfUse() {
    if (!termOfUseStatus) {
      Alert.alert(
        'Thông báo',
        'Bạn cần đồng ý với điều khoản sử dụng của Bảng Tin',
        [
          {
            text: t('common.OK')
          }
        ]
      );
    }
  }

  async function onLoginPress() {
    if (!termOfUseStatus) {
      checkTermOfUse();
      return;
    }
    let loadingOverlayId;
    try {
      loadingOverlayId = await Bootstrap.showLoadingOverlay(
        t('login.loggingIn')
      );
      await callSagaRequestWithErrorHandler(loginWithPhone, {
        phone,
        password
      });
      await Bootstrap.dismissLoadingOverlay(loadingOverlayId);
      Alert.alert(
        t('login.loginSucceedsAlertTitle'),
        t('login.loginSucceedsAlertContent'),
        [
          {
            text: t('common.OK'),
            onPress: () => {
              Bootstrap.pop();
            }
          }
        ]
      );
    } catch (err) {
      await Bootstrap.dismissLoadingOverlay(loadingOverlayId);
    }
  }

  async function onFacebookLoginPress() {
    if (!termOfUseStatus) {
      checkTermOfUse();
      return;
    }
    try {
      const loginResult = await LoginManager.logInWithReadPermissions([
        'public_profile',
        'email'
      ]);

      if (loginResult.isCancelled) {
        return;
      }

      const { accessToken } = await AccessToken.getCurrentAccessToken();

      const followingCategoryIds = categories.map(category => category.id);

      await callSagaRequestWithErrorHandler(loginWithFacebook, {
        accessToken,
        followingCategoryIds
      });
      Alert.alert(
        t('login.loginSucceedsAlertTitle'),
        t('login.loginSucceedsAlertContent'),
        [
          {
            text: t('common.OK'),
            onPress: () => {
              Bootstrap.pop();
            }
          }
        ]
      );
    } catch (err) {
      console.log(err);
      LoginManager.logOut();
    }
  }

  function onPhoneInputChanged(input) {
    setPhone(input);
  }

  async function onRegisterPress() {
    if (!termOfUseStatus) {
      checkTermOfUse();
      return;
    }
    try {
      const token = await RNAccountKit.loginWithPhone();
      Bootstrap.push({
        component: {
          name: 'UpdateInfo',
          passProps: {
            accessToken: token.token
          }
        }
      });
    } catch (err) {
      Alert.alert(t('login.errorTitle'), t('login.errorContent'));
    }
  }

  async function onForgotPasswordPress() {
    let token = null;
    try {
      token = (await RNAccountKit.loginWithPhone()).token;
      await callSagaRequest(forgotPassword, { accessToken: token });
      Bootstrap.push({
        component: {
          name: 'ForgotPassword',
          passProps: {
            accessToken: token
          }
        }
      });
    } catch (err) {
      if (
        err instanceof HTTPRequestError
        && err.statusCode === 400
        && !!token
      ) {
        showConfirmAlert(
          t('login.forgotPasswordPhoneNotExistsErrorTitle'),
          t('login.forgotPasswordPhoneNotExistsErrorContent'),
          t('common.close'),
          t('login.createAccount'),
          () => {
            Bootstrap.push({
              component: {
                name: 'UpdateInfo',
                passProps: {
                  accessToken: token
                }
              }
            });
          }
        );
      } else {
        Alert.alert(t('login.errorTitle'), t('login.errorContent'));
      }
    }
  }

  function onSettingPress() {
    Bootstrap.push({
      component: {
        name: 'Setting',
        options: {
          topBar: {
            title: {
              text: t('personal.appSettings')
            },
            backButton: {
              icon: images.back,
              color: colors.commonGrey
            }
          }
        }
      }
    });
  }

  function onLinkToTermOfUse() {
    Bootstrap.push({
      component: {
        name: 'TermOfUse'
      }
    });
  }

  function chooseTermOfUse() {
    setTermOfUseStatus(!termOfUseStatus);
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerCls="pb4"
    >
      <View cls="flx-i pb4">
        <View cls="phn-20">
          <View cls="flx-row-reverse mtn-22">
            <DebounceTouch
              hitSlop={{
                top: 12,
                bottom: 12,
                left: 12,
                right: 12
              }}
              onPress={onSettingPress}
            >
              <Image source={images.icSettings} cls="wd-24 hg-24" />
            </DebounceTouch>
          </View>
          <View cls="flx-row jcc aife">
            <Image source={images.miniLogo} cls="wd-32 hg-32 rm-contain" />
            <Text cls={fixAndroidBoldCls('ff-sfSb fs-24 ml2')}>Bảng Tin</Text>
          </View>
          <Text cls="ff-sfB fs-32 tc mt4 lh-40 newsTitle">
            {t('login.welcome')}
          </Text>
          <Text cls="ff-sfR fs-16 tc mtn-12 newsTitle">{t('login.title')}</Text>
          <View cls="hg-48 brs-8 bw-1 phn-20 b--loginInputBorder mt4">
            <PhoneNumberInput onInputChanged={onPhoneInputChanged} />
          </View>
          <View cls="hg-48 brs-8 bw-1 phn-20 b--loginInputBorder mtn-12 jcc">
            <InputField
              placeholder={t('login.password')}
              cls="ff-sfR fs-16"
              placeholderTextColor={colors.loginTextInputPlaceholder}
              secureTextEntry
              value={password}
              onChangeText={value => {
                setPassword(value);
              }}
            />
          </View>
          <TouchableOpacity
            cls="flx-row aic fullWidth jcc pv3 ph2"
            activeOpacity={0.8}
            onPress={chooseTermOfUse}
          >
            <View cls="sz-24 jcc aic b--empty oh bwh br2">
              {termOfUseStatus ? (
                <FontAwesome name="check" cls="reddish fs-18" />
              ) : null}
            </View>
            <View cls="pl2">
              <Text cls="fs-16 ff-sfR">
                Tôi đồng ý với
                {' '}
                <Text cls="fs-16 ff-sfSb reddish" onPress={onLinkToTermOfUse}>
                  điều khoản sử dụng
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
          <TextButton
            label={t('login.loginButtonTitle')}
            containerCls="bg-reddish hg-48 jcc aic brs-8"
            textCls="tc ff-sfSb fs-16 loginButtonText white"
            callback={onLoginPress}
          />
          <Text cls="ff-sfSb fs-14 tc mtn-24 newsTitle">{t('login.or')}</Text>

          <DebounceTouch
            cls="flx-row mtn-24 bg-loginWithFacebook brs-8 hg-48 aic phn-20"
            onPress={onFacebookLoginPress}
          >
            <FontAwesome name="facebook" cls="white fs-32" />
            <View cls="flx-i jcc aic">
              <Text cls="fs-16 ff-sfSb white tc">
                {t('login.loginWithFacebook')}
              </Text>
            </View>
            <FontAwesome name="facebook" cls="loginWithFacebook fs-32" />
          </DebounceTouch>
          <TextButton
            containerCls="mt4 jcc aic"
            textCls="fs-14 ff-sfSb newsTitle"
            label={t('login.forgotPassword')}
            callback={onForgotPasswordPress}
          />
          <DebounceTouch onPress={onRegisterPress}>
            <Text cls="ff-sfSb tc mtn-12 commonGrey">
              {`${t('login.noAccount')} `}
              <Text cls="fs-14 tc mtn-24 newsTitle">{t('login.register')}</Text>
            </Text>
          </DebounceTouch>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default wrap(Login);

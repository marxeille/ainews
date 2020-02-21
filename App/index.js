/**
 * @flow
 */
import { UIManager, AppState, Platform, Linking } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import appsFlyer from 'react-native-appsflyer';
import OneSignal from 'react-native-onesignal';

import { extractURLSchemeLink } from 'AINews/src/utils/trivia';
import registerNavigationComponents from '../screens';
import { setI18nConfig, RNLocalize } from '../utils/LocalizationUtils';
import { buildTheme } from '../themes/config-theme';
import configStore from '../store/index';
import Bootstrap from './Bootstrap';
import { ONESIGNAL_KEY } from '../config';

console.disableYellowBox = true;

let isFirstTime: boolean = true;
let store = null;

let currentAppState = AppState.currentState;

Navigation.events().registerAppLaunchedListener(async () => {
  if (isFirstTime) {
    isFirstTime = false;
    await init();
  }
  await Bootstrap.startApp();
});

UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

function handleSubscribe() {}

async function initAppsFlyer() {
  AppState.addEventListener('change', handleAppStateChanged);

  // DO NOT REMOVE THIS LISTENER, or else onAppOpenAttribution's callback won't be called
  appsFlyer.onInstallConversionData(result => {
    console.log('onInstallConversionData', result);
  });

  appsFlyer.onAppOpenAttribution(result => {
    if (Bootstrap.isInStartupScreen) {
      return;
    }
    console.log('onAppOpenAttribution', result);
    const { data, status } = result;
    if (status === 'success') {
      if (data?.c === 'sharePost') {
        const { postId } = data;
        if (postId) {
          Bootstrap.push({
            component: {
              name: 'LinkedNewsDetails',
              passProps: {
                id: postId
              }
            }
          });
        }
      }

      if (data?.link?.startsWith('bangtin://')) {
        const { action, params } = extractURLSchemeLink(data.link);
        if (action === 'postDetails') {
          const { id } = params;
          if (id) {
            Bootstrap.push({
              component: {
                name: 'LinkedNewsDetails',
                passProps: {
                  id
                }
              }
            });
          }
        }
      }
    }
  });

  const options = {
    isDebug: false,
    devKey: 'qJskn7PFtLFxCQcWHgrzkL'
  };

  if (Platform.OS === 'ios') {
    options.appId = '1460248416';
  }

  await appsFlyer.initSdk(options);
  // console.log('Done appsFlyer initSdk', result);

  return new Promise(resolve => {
    appsFlyer.setAppInviteOneLinkID('wsAC', (...successParams) => {
      console.log('Done appsFlyer setAppInviteOneLinkID', ...successParams);
      resolve(...successParams);
    });
  });
}

async function handleAppStateChanged(nextAppState) {
  console.log(`handleAppStateChanged ${currentAppState} -> ${nextAppState}`);
  if (
    currentAppState.match(/inactive|background/)
    && nextAppState === 'active'
  ) {
    if (Platform.OS === 'ios') {
      appsFlyer.trackAppLaunch();
    } else {
      const url = await Linking.getInitialURL();
      if (url) {
        appsFlyer.sendDeepLinkData(url);
      }
    }
  }

  currentAppState = nextAppState;
}

async function init() {
  await initAppsFlyer();

  store = await configStore();

  if (
    store
    && store.getState
    && typeof store.getState === 'function'
    && store.getState().themes
  ) {
    buildTheme(store.getState().themes.nightMode);
  } else {
    buildTheme(false);
  }

  store.subscribe(handleSubscribe);
  registerNavigationComponents(store, Provider);
  setI18nConfig();
  RNLocalize.addEventListener('change', () => {
    setI18nConfig();
  });
}

// register oneSignal
OneSignal.init(ONESIGNAL_KEY, {
  kOSSettingsKeyAutoPrompt: true
});
OneSignal.inFocusDisplaying(0);

const notification = OneSignal;

export { store, notification };

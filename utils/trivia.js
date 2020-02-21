import { Dimensions, Platform, Alert } from 'react-native';
import qs from 'qs';
import { t } from './LocalizationUtils';
import Bootstrap from '../App/Bootstrap';

export const logArray = (array, tag = 'UNTAGGED') => {
  console.log(
    `%c LOGGING ARRAY ${tag.toUpperCase()}`,
    'background: #222; color: #bada55'
  );
  for (let i = 0; i < array.length; i += 1) {
    console.log(
      `%c -----${tag}[${i}] ${JSON.stringify(array[i])}`,
      'background: #222; color: #bada55'
    );
  }
};

export const getTrimmedString = (string, maxLength) => {
  if (!string) {
    return '';
  }

  if (!maxLength) {
    return string;
  }

  return string.length > maxLength
    ? `${string.substring(0, maxLength - 3).replace(/\s+$/, '')}...`
    : string;
};

export const sleep = (duration: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });

export const fixAndroidBoldCls = cls => `${cls} ${isAndroid ? 'fw5' : ''}`;

export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export function getScaledSize(width) {
  return Math.round((width / 414) * WINDOW_WIDTH);
}

export function showLoginRequiredAlert(rootComponentId) {
  Alert.alert('', t('common.loginRequireMessage'), [
    {
      text: t('common.back'),
      style: 'destructive'
    },
    {
      text: t('common.login'),
      style: 'default',
      onPress: () => {
        Bootstrap.push({
          component: {
            name: 'Login',
            passProps: {
              rootComponentId
            }
          }
        });
      }
    }
  ]);
}

export function showConfirmAlert(
  title,
  message,
  cancelText,
  confirmText,
  callback
) {
  Alert.alert(title, message, [
    {
      text: cancelText,
      style: 'default'
    },
    {
      text: confirmText,
      style: 'destructive',
      onPress: callback
    }
  ]);
}

export function getDiffFromArrays(a, b) {
  const added = [];
  const removed = [];
  for (let i = 0; i < a.length; i += 1) {
    if (b.indexOf(a[i]) < 0) {
      removed.push(a[i]);
    }
  }
  for (let i = 0; i < b.length; i += 1) {
    if (a.indexOf(b[i]) < 0) {
      added.push(b[i]);
    }
  }
  return [added, removed];
}

export function extractURLSchemeLink(link) {
  const [first, second] = link.split('?');
  const action = first.split('://')[1];
  const params = qs.parse(second);
  return { action, params };
}

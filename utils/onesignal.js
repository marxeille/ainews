import OneSignal from 'react-native-onesignal';

export const sendTags = userId => {
  OneSignal.sendTags({
    userId
  });
};

export const deleteTags = () => {
  OneSignal.deleteTag('userId');
};

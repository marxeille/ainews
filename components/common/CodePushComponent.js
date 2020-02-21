import { useEffect } from 'react';
import codePush from 'react-native-code-push';

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};

const CodePushComponent = () => {
  useEffect(() => {
    codePush.sync();
  }, []);

  return null;
};

export default codePush(codePushOptions)(CodePushComponent);

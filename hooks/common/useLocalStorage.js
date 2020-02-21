import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(defaultValue);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const item = JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
      setStoredValue(item);
    } catch (err) {
      console.log('useLocalStore/init error', err);
    }
  }

  function setValue(value) {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.log('useLocalStore/setValue error', err);
    }
  }

  return [storedValue, setValue];
}

export default useLocalStorage;

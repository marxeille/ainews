import { useState, useEffect } from 'react';
import LinkPreview from 'react-native-link-preview';

const useLinkPreview = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  let didCancel = false;

  useEffect(() => {
    didCancel = false;
    loadData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  async function loadData() {
    try {
      if (didCancel) {
        return;
      }
      setLoading(true);
      const dataResult = await LinkPreview.getPreview(url);
      if (!didCancel) {
        setData(dataResult);
      }
    } catch (err) {
      console.log('useLinkPreview/loadData error', err);
    } finally {
      if (!didCancel) {
        setLoading(false);
      }
    }
  }

  return [data, loading];
};

export default useLinkPreview;

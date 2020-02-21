import { useState, useEffect } from 'react';
import { getPostDetails } from '../store/actions/posts';
import { callSagaRequest } from '../utils/RequestHandler';

const useNewsDetails = (newsId) => {
  const [news, setNews] = useState('no content');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load(newsId);
  }, [newsId]);

  async function load(id) {
    setLoading(true);
    try {
      const newsResult = await callSagaRequest(getPostDetails, { id });
      const { content } = newsResult;
      setNews(content);
    } catch (err) {
      console.log('useNewsDetails/load error', err);
    } finally {
      setLoading(false);
    }
  }

  return [news, loading];
};

export default useNewsDetails;

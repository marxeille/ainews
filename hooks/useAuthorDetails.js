import { useState, useEffect } from 'react';
import { callSagaRequest } from '../utils/RequestHandler';
import { getAuthorProfile } from '../store/actions/authors';

const useAuthorDetails = authorId => {
  const [authorDetail, setAuthorDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load(authorId);
  }, [authorId]);

  async function load(id) {
    setLoading(true);
    try {
      const result = await callSagaRequest(getAuthorProfile, { authorId: id });
      setAuthorDetail(result);
    } catch (err) {
      console.log('useNewsDetails/load error', err);
    } finally {
      setLoading(false);
    }
  }

  return { authorDetail, loading, load };
};

export default useAuthorDetails;

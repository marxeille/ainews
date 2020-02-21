import { useState, useEffect, useRef, useCallback } from 'react';
import { callSagaRequest } from '../utils/RequestHandler';
import { getRelatedPosts } from '../store/actions/posts';

function useRelatedPosts({ postId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const _loading = useRef(false);
  const _postId = useRef(postId);

  useEffect(() => {
    _loading.current = loading;
  }, [loading]);

  useEffect(() => {
    load();
  }, [load]);

  const load = useCallback(async () => {
    if (_loading.current) {
      return;
    }

    setLoading(true);

    try {
      const result = await callSagaRequest(getRelatedPosts, {
        postId: _postId.current
      });

      if (result) {
        const { items } = result;
        items && setPosts(items);
      }
    } catch (err) {
      console.log('useRelatedPosts/load error', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    posts,
    loading,
    load
  };
}

export default useRelatedPosts;

import {
  useState, useEffect, useRef, useCallback
} from 'react'
import { callSagaRequest } from '../utils/RequestHandler';
import { getUserListComment } from '../store/actions/user';

function usePersonalComments({ pageSize = 10 }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const _page = useRef(null);
  const _pageSize = useRef(pageSize);
  const _hasNext = useRef(true)
  const _refreshing = useRef(false);
  const _loading = useRef(false);

  useEffect(() => {
    _refreshing.current = refreshing;
  }, [refreshing])

  useEffect(() => {
    _loading.current = loading;
  }, [loading])

  const refresh = useCallback(async () => {
    // _queuedSavedPostsIds.current = {};
    _page.current = null;
    _hasNext.current = true;
    _loading.current = false;
    setComments(null);
    setRefreshing(true);
    await load()
    setRefreshing(false);
  }, [load]);

  const load = useCallback(async () => {
    if (!_hasNext.current || _loading.current) {
      return;
    }

    setLoading(true);

    try {
      const result = await callSagaRequest(getUserListComment, {
        lastId: _page.current,
        size: _pageSize.current
      })

      if (result) {
        const { items, lastId } = result;

        if (items.length !== _pageSize.current) {
          _hasNext.current = false;
        }

        if (items.length > 0) {
          _page.current = lastId;
        }

        setComments(_comments => {
          if (!_comments) {
            return [...items];
          }
          return [..._comments, ...items]
        })
      }
    } catch (err) {
      console.log('usePersonalComments/load error', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    comments,
    loading,
    refreshing,
    refresh,
    load
  }
}

export default usePersonalComments;

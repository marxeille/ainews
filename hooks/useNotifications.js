import { useState, useEffect, useRef, useCallback } from 'react';
import { callSagaRequest } from '../utils/RequestHandler';
import { getNotifications } from '../store/actions/notification';

function useNotifications({ pageSize = 10 }) {
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const _page = useRef(1);
  const _pageSize = useRef(pageSize);
  const _hasNext = useRef(true);
  const _refreshing = useRef(false);
  const _loading = useRef(false);

  useEffect(() => {
    _refreshing.current = refreshing;
  }, [refreshing]);

  useEffect(() => {
    _loading.current = loading;
  }, [loading]);

  const refresh = useCallback(async () => {
    _page.current = 1;
    _hasNext.current = true;
    _loading.current = false;
    setNotifications(null);
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const load = useCallback(async () => {
    if (!_hasNext.current || _loading.current) {
      return;
    }

    setLoading(true);

    try {
      const result = await callSagaRequest(getNotifications, {
        page: _page.current,
        size: _pageSize.current
      });

      if (result) {
        const { items } = result;

        if (items.length !== _pageSize.current) {
          _hasNext.current = false;
        }

        if (items.length > 0) {
          _page.current += 1;
        }

        setNotifications(_notifications => {
          if (!_notifications) {
            return [...items];
          }
          return [..._notifications, ...items];
        });
      }
    } catch (err) {
      console.log('useNotifications/load error', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    notifications,
    loading,
    refreshing,
    refresh,
    load
  };
}

export default useNotifications;

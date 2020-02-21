import { useState, useEffect, useRef, useCallback } from 'react';
import { callSagaRequest } from '../utils/RequestHandler';
import {
  getPosts,
  getPostsByAuthor,
  getPostsByGroup
} from '../store/actions/posts';

const PAGE_SIZE = 10;

const usePostCursorByCategory = (category, filterType = 'createdTime') => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const filters = useRef(null);
  const orderBy = useRef(filterType);
  const lastId = useRef(null);
  const hasNext = useRef(true);
  const hidPosts = useRef({});
  const _loading = useRef(false);

  useEffect(() => {
    if (category && filterType) {
      filters.current = category.id !== 'dexuat' ? { categoryId: category.id } : null;
      orderBy.current = filterType;
      refresh();
    }
  }, [category, filterType, refresh]);

  useEffect(() => {
    _loading.current = loading;
  }, [loading]);

  const refresh = useCallback(async () => {
    lastId.current = null;
    hasNext.current = true;
    setRefreshing(true);
    await load(true);
    setRefreshing(false);
  }, [load]);

  const load = useCallback(
    async isRefreshing => {
      if (!hasNext.current || _loading.current) {
        return;
      }

      setLoading(true);

      try {
        const result = await callSagaRequest(getPosts, {
          lastId: lastId.current,
          size: PAGE_SIZE,
          filters: filters.current,
          orderBy: orderBy.current
        });
        if (result) {
          const { items } = result;

          if (items.length < PAGE_SIZE) {
            hasNext.current = false;
          }

          if (items.length > 0) {
            lastId.current = result.lastId;
            if (isRefreshing) {
              if (category.id === 'dexuat') {
                items.unshift({ id: -1 });
              }
              setPosts(items);
            } else {
              setPosts(_posts => [..._posts, ...items]);
            }
          }
        }
      } catch (err) {
        console.log('useCursor/load error', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [category.id]
  );

  const hide = useCallback(postId => {
    if (hidPosts.current[postId]) {
      return;
    }
    hidPosts.current[postId] = true;
    setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
  }, []);

  return {
    posts,
    refresh,
    refreshing,
    load,
    loading,
    hide
  };
};

const usePostCursorByAuthor = (authorId, filterType = 'createdTime') => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const orderBy = useRef(filterType);
  const lastId = useRef(null);
  const hasNext = useRef(true);
  const _loading = useRef(false);

  useEffect(() => {
    if (authorId && filterType) {
      orderBy.current = filterType;
      refresh();
    }
  }, [authorId, filterType, refresh]);

  useEffect(() => {
    _loading.current = loading;
  }, [loading]);

  const refresh = useCallback(async () => {
    lastId.current = null;
    hasNext.current = true;
    await load(true);
    setRefreshing(false);
  }, [load]);

  const load = useCallback(
    async isRefreshing => {
      if (!hasNext.current || _loading.current) {
        return;
      }

      setLoading(true);

      try {
        const result = await callSagaRequest(getPostsByAuthor, {
          authorId,
          lastId: lastId.current,
          size: PAGE_SIZE,
          orderBy: orderBy.current
        });
        if (result) {
          const { items } = result;

          if (items.length !== PAGE_SIZE) {
            hasNext.current = false;
          }

          if (items.length > 0) {
            lastId.current = result.lastId;
            if (isRefreshing) {
              setPosts(items);
            } else {
              setPosts(_posts => [..._posts, ...items]);
            }
          }
        }
      } catch (err) {
        console.log('useCursor/load error', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [authorId]
  );

  return {
    posts,
    refresh,
    refreshing,
    load,
    loading
  };
};

const usePostCursorByGroup = (groupName, filterType = 'createdTime') => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const currentPage = useRef(1);
  const hasNext = useRef(true);
  const _loading = useRef(false);

  useEffect(() => {
    if (groupName) {
      refresh();
    }
  }, [refresh, groupName]);

  useEffect(() => {
    _loading.current = loading;
  }, [loading]);

  const refresh = useCallback(async () => {
    currentPage.current = 1;
    hasNext.current = true;
    setPosts([]);
    setRefreshing(true);
    await load(true);
    setRefreshing(false);
  }, [load]);

  const load = useCallback(
    async isRefreshing => {
      if (!hasNext.current || _loading.current) {
        return;
      }

      setLoading(true);

      try {
        const result = await callSagaRequest(getPostsByGroup, {
          groupName,
          page: currentPage.current,
          size: PAGE_SIZE,
          orderBy: filterType
        });
        if (result) {
          const { items } = result;

          if (items.length !== PAGE_SIZE) {
            hasNext.current = false;
          }

          if (items.length > 0) {
            currentPage.current += 1;
            if (isRefreshing) {
              setPosts(items);
            } else {
              setPosts(_posts => [..._posts, ...items]);
            }
          }
        }
      } catch (err) {
        console.log('usePostCursorByGroup/load error', err);
      } finally {
        setLoading(false);
      }
    },
    [filterType, groupName]
  );

  return {
    posts,
    refresh,
    refreshing,
    load,
    loading
  };
};

export { usePostCursorByAuthor, usePostCursorByCategory, usePostCursorByGroup };

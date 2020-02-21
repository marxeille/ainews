import {
  useState, useEffect, useRef, useCallback
} from 'react'
import { callSagaRequest } from '../utils/RequestHandler';
import { getBookmarks, deleteBookmark } from '../store/actions/user';

type Props = {
  pageSize: number
}

function useSavedPosts({ pageSize = 10 }: Props) {
  const [savedPosts, setSavedPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // const [queuingSavedPosts, setQueuingSavedPosts] = useState([]);

  // const _queuedSavedPostsIds = useRef({});
  const _page = useRef(1);
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
    _page.current = 1;
    _hasNext.current = true;
    _loading.current = false;
    setSavedPosts(null);
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
      const result = await callSagaRequest(getBookmarks, {
        page: _page.current,
        size: _pageSize.current
      })

      if (result) {
        const { items } = result;

        if (items.length !== _pageSize.current) {
          _hasNext.current = false;
        }

        if (items.length > 0) {
          _page.current += 1;
        }

        setSavedPosts(_savedPosts => {
          if (!_savedPosts) {
            return [...items]
          }
          return [..._savedPosts, ...items]
        }

          // [
          // ..._savedPosts,
          // ...items
          // ...items.filter(item => !_queuedSavedPostsIds.current[item.id])
        // ]
        );
      }
    } catch (err) {
      console.log('useSavedPosts/load error', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const removePost = useCallback(async (postId) => {
    setSavedPosts(_savedPosts => _savedPosts.filter(post => post.id !== postId));
    await callSagaRequest(deleteBookmark, { postId })
  }, [])

  return {
    savedPosts,
    removePost,
    // queuingSavedPosts,
    refresh,
    refreshing,
    load,
    loading
  }
}

export default useSavedPosts;

// const add = useCallback(async (item) => {
//   if (_queuedSavedPostsIds.current[item.id]) {
//     return;
//   }

//   setQueuingSavedPosts(_queuingSavedPosts => [
//     item,
//     ..._queuingSavedPosts
//   ]);

//   await callSagaRequest(addBookmark, {
//     postId: item.id
//   })

//   _queuedSavedPostsIds.current[item.id] = true;
// }, [])

import { useState, useEffect, useCallback, useRef } from 'react';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import {
  getFollowedAuthors,
  getAuthorSuggestions
} from 'AINews/src/store/actions/authors';

const PAGE_SIZE = 10;

type AuthorType = 'suggestion' | 'following';

type Props = {
  type: AuthorType
};

const useFollowedAuthors = (props: Props) => {
  const { type } = props;

  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const _loading = useRef(false);

  const hasNext = useRef(true);
  const currentPage = useRef(true);

  useEffect(() => {
    _loading.current = loading;
  }, [loading]);

  const refresh = useCallback(async () => {
    hasNext.current = true;
    currentPage.current = 1;
    setAuthors([]);
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const load = useCallback(async () => {
    if (!hasNext.current || _loading.current) {
      return;
    }

    setLoading(true);

    try {
      let result;
      if (type === 'following') {
        result = await callSagaRequest(getFollowedAuthors, {
          page: currentPage.current,
          size: PAGE_SIZE
        });
      } else {
        result = await callSagaRequest(getAuthorSuggestions, {
          page: currentPage.current,
          size: PAGE_SIZE
        });
      }
      if (result) {
        const { items } = result;

        if (items.length < PAGE_SIZE) {
          hasNext.current = false;
        }

        if (items.length > 0) {
          currentPage.current += 1;
          setAuthors(_authors => [..._authors, ...items]);
        }
      }
    } catch (err) {
      console.log('useAuthor/load error', err);
    } finally {
      setLoading(false);
    }
  }, [type]);

  return {
    authors,
    refresh,
    load,
    refreshing,
    loading
  };
};

export default useFollowedAuthors;

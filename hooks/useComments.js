import { useState, useEffect, useRef, useCallback } from 'react';

import { useSelector } from 'react-redux';
import { logArray } from 'AINews/src/utils/trivia';

import { callSagaRequest } from '../utils/RequestHandler';
import {
  getNewestComments,
  getTopComments,
  getSubComments
} from '../store/actions/comments';
import { commentPost, replyComment } from '../store/actions/user';

export type CommentsType = 'top' | 'newest' | 'sub';

type Props = {
  id: String,
  pageSize?: number,
  type?: CommentsType,
  reverseQueuingComments?: boolean
};

function useComments({
  id,
  pageSize = 10,
  type = 'top',
  reverseQueuingComments = false
}: Props) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const [queuingComments, setQueuingComments] = useState([]);

  const _queuedCommentIds = useRef({});
  const _page = useRef(1);
  const _lastId = useRef(null);
  const _hasNext = useRef(true);
  const _loading = useRef(false);
  const _reverseQueuingComments = useRef(reverseQueuingComments);

  const profile = useSelector(state => state.me.profile);

  useEffect(() => {
    setQueuingComments([]);
    setComments([]);
    _queuedCommentIds.current = {};
    _page.current = 1;
    _lastId.current = null;
    _hasNext.current = true;
  }, [id, pageSize, type]);

  useEffect(() => {
    _loading.current = loading;
  }, [loading]);

  const load = useCallback(async () => {
    if (!_hasNext.current || _loading.current) {
      return;
    }

    setLoading(true);

    try {
      let result;
      if (type === 'top') {
        result = await callSagaRequest(getTopComments, {
          postId: id,
          page: _page.current,
          size: pageSize
        });
      } else if (type === 'newest') {
        result = await callSagaRequest(getNewestComments, {
          postId: id,
          lastId: _lastId.current,
          size: pageSize
        });
      } else {
        result = await callSagaRequest(getSubComments, {
          commentId: id,
          lastId: _lastId.current,
          size: pageSize
        });
      }

      if (result) {
        const { items } = result;

        // logArray(items, 'LoadedItems');

        if (items.length !== pageSize) {
          _hasNext.current = false;
        }

        if (items.length > 0) {
          if (result.lastId) {
            _lastId.current = result.lastId;
          } else {
            _page.current += 1;
          }
          setComments(_comments => [
            ..._comments,
            ...items.filter(item => {
              const dataItemId = item.id;
              return !_queuedCommentIds.current[dataItemId];
            })
          ]);
        }
      }
    } catch (err) {
      console.log('useComments/load error', err);
    } finally {
      setLoading(false);
    }
  }, [type, id, pageSize]);

  const add = useCallback(
    async (content, localId_) => {
      const createdAt = Date.now();
      const localId = localId_ || `local_${createdAt}`;
      setQueuingComments(_queingComments => (_reverseQueuingComments.current
        ? [
          {
            id: localId
          },
          ..._queingComments
        ]
        : [
          ..._queingComments,
          {
            id: localId
          }
        ]));
      setAdding(true);
      let result;
      try {
        if (type === 'sub') {
          result = await callSagaRequest(replyComment, {
            commentId: id,
            content,
            userId: profile.id,
            id: localId,
            createdAt,
            user: {
              id: profile.id,
              fullName: profile.fullName,
              avatar: profile.avatar
            }
          });
        } else {
          result = await callSagaRequest(commentPost, {
            postId: id,
            content,
            userId: profile.id,
            id: localId,
            createdAt,
            user: {
              id: profile.id,
              fullName: profile.fullName,
              avatar: profile.avatar
            }
          });
        }
        const resultId = result.commentId;
        _queuedCommentIds.current[resultId] = true;
      } catch (err) {
        console.log('useComments/add error', err);
      } finally {
        setAdding(false);
      }
    },
    [id, profile.avatar, profile.fullName, profile.id, type]
  );

  const remove = useCallback(commentId => {
    setComments(_comments => {
      console.log('Before removal', _comments[0]);
      const newComments = _comments.filter(comment => comment.id !== commentId);
      console.log('After removal', newComments[0]);
      return newComments;
    });

    setQueuingComments(_comments => _comments.filter(comment => comment.id !== commentId));
  }, []);

  const edit = useCallback((commentId, content) => {
    let changed = false;

    setComments(_comments => _comments.map(comment => {
      if (comment.id !== commentId) {
        return comment;
      }
      changed = true;
      return {
        ...comment,
        content
      };
    }));
    if (changed) {
      return;
    }

    setQueuingComments(_comments => _comments.map(comment => {
      if (comment.id !== commentId) {
        return comment;
      }
      return {
        ...comment,
        content
      };
    }));
  }, []);

  return {
    comments,
    queuingComments,
    load,
    loading,
    add,
    adding,
    remove,
    edit
  };
}

export default useComments;

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import TextButton from 'AINews/src/elements/TextButton';
import useComments from 'AINews/src/hooks/useComments';
import { fixAndroidBoldCls } from 'AINews/src/utils/trivia';
import { t } from 'AINews/src/utils/LocalizationUtils';
import CommentItem from './CommentItem';
import CommentPlaceholder from './CommentItem/CommentPlaceholder';

type Props = {
  id: String,
  replyNumber: number,
  onCommentShouldBeEdited: Function,
  componentRef?: React.Ref,
  onReplyPress?: (String, String, number) => void
};

const ReplyList = (props: Props) => {
  const {
    id,
    replyNumber,
    onCommentShouldBeEdited,
    componentRef,
    onReplyPress
  } = props;

  const [expanded, setExpanded] = useState(false);
  const [remainingReplyNumber, setRemainingReplyNumber] = useState(replyNumber);

  const replyItemRefs = useRef({});
  const commentPlaceholderRef = useRef();

  const {
    comments,
    queuingComments,
    load,
    loading,
    add,
    remove,
    edit
  } = useComments({
    id,
    type: 'sub'
  });

  if (componentRef) {
    componentRef.current = {
      reply,
      getRepliesNumber,
      editComment
    };
  }

  const getData = useCallback(() => {
    return [
      ...comments.sort((a, b) => a.createdAt > b.createdAt),
      ...queuingComments.sort((a, b) => a.createdAt > b.createdAt)
    ];
  }, [comments, queuingComments]);

  useEffect(() => {
    setRemainingReplyNumber(replyNumber - comments.length);
  }, [comments, replyNumber]);

  function onExpandPress() {
    setExpanded(true);
    load();
  }

  function reply(content, commentId) {
    if (!expanded) {
      setExpanded(true);
    }
    add(content);
  }

  function getRepliesNumber() {
    return queuingComments.length + comments.length;
  }

  function editComment(commentId, content) {
    edit(commentId, content);
  }

  const renderItem = useCallback(
    ({ item }) => {
      const itemId = item.id;

      if (!replyItemRefs.current[itemId]) {
        replyItemRefs.current[itemId] = { current: null };
      }

      const handleReplyPress = (_, __, pageOffsetY) => {
        onReplyPress(itemId, id, pageOffsetY);
      };

      return (
        <CommentItem
          onCommentShouldBeEdited={onCommentShouldBeEdited}
          remove={remove}
          parentId={id}
          isSubComment
          componentRef={replyItemRefs.current[itemId]}
          id={itemId}
          onReplyPress={handleReplyPress}
        />
      );
    },
    [id, onReplyPress, remove, onCommentShouldBeEdited]
  );

  const handleCommentPlaceholderPress = useCallback(() => {
    commentPlaceholderRef.current.measure((fx, fy, width, height, px, py) => {
      onReplyPress(id, null, py - height);
    });
  }, [id, onReplyPress]);

  if (!replyNumber && !expanded) {
    return null;
  }

  return (
    <View cls="flx-i">
      <View cls="hg-13" />
      {remainingReplyNumber > 0 ? (
        <TextButton
          label={t('newsDetails.seeReplies', {
            repliesNumber: remainingReplyNumber
          })}
          callback={onExpandPress}
          textCls={fixAndroidBoldCls('fs-13 commonBlack ff-sfB')}
        />
      ) : null}
      {expanded ? (
        <FlatList
          scrollEnabled={false}
          keyExtractor={item => `${item.id}`}
          initialNumToRender={queuingComments.length + comments.length}
          data={getData()}
          renderItem={wrap(renderItem)}
          ListHeaderComponent={loading ? <ActivityIndicator /> : null}
          ListFooterComponent={
            getRepliesNumber() > 0 ? (
              <CommentPlaceholder
                componentRef={commentPlaceholderRef}
                commentId={id}
                callback={handleCommentPlaceholderPress}
              />
            ) : null
          }
        />
      ) : null}
    </View>
  );
};

ReplyList.defaultProps = {
  componentRef: null,
  onReplyPress: () => {}
};

export default memo(
  wrap(ReplyList, 'defaultProps'),
  (prevProps: Props, nextProps: Props) =>
    prevProps.id === nextProps.id &&
    prevProps.replyNumber === nextProps.replyNumber
);

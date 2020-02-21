import React, { useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Alert } from 'react-native';
import moment from 'moment';

import { wrap } from '@agiletechvn/react-theme';
import ActionSheet from 'react-native-actionsheet';
import { deleteComment, deleteSubComment } from 'AINews/src/store/actions/user';
import { showConfirmAlert } from 'AINews/src/utils/trivia';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { t } from 'AINews/src/utils/LocalizationUtils';
import ReplyList from 'AINews/src/screens/Home/NewsDetails/ReplyList';
import CommentBox from 'AINews/src/screens/Home/NewsDetails/CommentItem/CommentBox';
import CommentItemAvatar from 'AINews/src/screens/Home/NewsDetails/CommentItem/CommentItemAvatar';
import CommentInteractiveSection from 'AINews/src/screens/Home/NewsDetails/CommentItem/CommentInteractiveSection';

type Props = {
  id: String,
  onReplyPress: Function,
  parentId: String,
  remove: Function,
  onCommentShouldBeEdited: Function,
  onLayout?: Function,
  componentRef?: React.Ref,
  isSubComment?: boolean
};

const CommentItem = (props: Props) => {
  const {
    id,
    parentId,
    onReplyPress,
    componentRef,
    isSubComment,
    onLayout,
    remove,
    onCommentShouldBeEdited
  } = props;

  const comment = useSelector(state => state.comments[id]);
  const parentComment = useSelector(state => state.comments[parentId]);
  const profile = useSelector(state => state.me.profile);
  const _sendingStatus = useRef();

  const otherCommentOptions = useMemo(
    () => [t('commentInteract.report'), t('common.close')],
    []
  );
  const userCommentOptions = useMemo(
    () => [
      t('commentInteract.edit'),
      t('commentInteract.delete'),
      t('common.close')
    ],
    []
  );

  const {
    userId,
    user,
    createdAt,
    content,
    subCommentNumber,
    upVoteNumber,
    downVoteNumber,
    vote,
    sendingStatus,
    postId,
    remoteId
  } = comment;

  useEffect(() => {
    _sendingStatus.current = sendingStatus;
  }, [sendingStatus]);

  const actionSheetRef = useRef();
  const replyListRef = useRef();
  const containerRef = useRef();
  const timer = useRef(null);

  useEffect(
    () => () => {
      clearInterval(timer.current);
    },
    []
  );

  if (componentRef) {
    componentRef.current = {
      reply,
      measure,
      getRepliesNumber,
      editComment
    };
  }

  function measure(...params) {
    if (containerRef.current) {
      containerRef.current.measure(...params);
    }
  }

  function reply(replyContent, replyingCommentId) {
    if (replyListRef.current) {
      replyListRef.current.reply(replyContent, replyingCommentId);
    }
  }

  function editComment(commentId, newContent) {
    if (replyListRef.current) {
      replyListRef.current.editComment(commentId, newContent);
    }
  }

  function getRepliesNumber() {
    if (replyListRef.current) {
      return replyListRef.current.getRepliesNumber();
    }
    return 0;
  }

  const onInteract = useCallback(() => {
    if (
      `${id}`.startsWith('local_')
      && _sendingStatus.current !== 'succeeded'
    ) {
      return;
    }

    // if (userId !== profile.id) {
    //   return;
    // }

    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  }, [id]);

  function onItemSelect(index) {
    if (!profile || !profile.id) {
      if (index !== otherCommentOptions.length - 1) {
        Alert.alert(
          'Thông báo',
          'Bạn cần đăng nhập để thực hiện chức năng này',
          [
            {
              text: t('common.OK')
            }
          ]
        );
      }
      return;
    }
    if (userId !== profile.id) {
      if (index === 0) {
        timer.current = setTimeout(() => {
          Alert.alert(
            'Thông báo',
            'Gửi báo cáo thành công\nChúng tôi sẽ xem xét và xử lý bình luận này',
            [
              {
                text: t('common.OK')
              }
            ]
          );
        }, 200);
      }

      return;
    }

    if (index === 0) {
      onCommentShouldBeEdited({
        parentCmtId: isSubComment ? parentId : null,
        commentId: id
      });
      return;
    }

    if (index === 1) {
      showConfirmAlert(
        t('commentInteract.deleteConfirmTitle'),
        t('commentInteract.deleteConfirmMessage'),
        t('common.back'),
        t('commentInteract.delete'),
        () => {
          remove(id);
          if (!isSubComment) {
            callSagaRequest(deleteComment, {
              postId: parentId,
              commentId: remoteId || id
            });
            return;
          }

          callSagaRequest(deleteSubComment, {
            parentCmtId: parentComment.remoteId || parentId,
            commentId: remoteId || id
          });
        }
      );
    }
  }

  function renderReplyList() {
    return (
      <View cls="flx-row">
        <ReplyList
          onCommentShouldBeEdited={onCommentShouldBeEdited}
          id={id}
          replyNumber={subCommentNumber}
          componentRef={replyListRef}
          onReplyPress={onReplyPress}
        />
      </View>
    );
  }

  return (
    <View
      onLayout={onLayout}
      ref={containerRef}
      cls={`bg-white pvn-8 ${isSubComment ? '' : 'phn-12'}`}
    >
      <View cls="flx-row">
        <View cls={isSubComment ? 'ptn-6' : ''}>
          <CommentItemAvatar
            isSmallSize={isSubComment}
            sendingStatus={sendingStatus}
            user={user}
          />
        </View>
        <View cls="wd-6" />
        <View cls="flx-i aifs">
          <CommentBox
            createdAt={createdAt}
            user={user}
            content={content}
            sendingStatus={sendingStatus}
            callback={onInteract}
          />
          <View cls="hg-4" />
          <View cls="flx-row aic">
            <View cls="pl3">
              <Text cls="lightGreyish fs-12 ff-sfR">
                {`${moment(createdAt).fromNow()}`}
              </Text>
            </View>
            <View cls="pln-14">
              <CommentInteractiveSection
                id={id}
                isSubComment={isSubComment}
                sendingStatus={sendingStatus}
                onReplyPress={onReplyPress}
                upVoteNumber={upVoteNumber}
                downVoteNumber={downVoteNumber}
                vote={vote}
                postId={postId}
                content={content}
                parentId={parentId}
              />
            </View>
          </View>
          {isSubComment ? null : renderReplyList()}
        </View>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        options={
          userId !== profile.id ? otherCommentOptions : userCommentOptions
        }
        cancelButtonIndex={
          userId !== profile.id
            ? otherCommentOptions.length - 1
            : userCommentOptions.length - 1
        }
        onPress={onItemSelect}
      />
    </View>
  );
};

CommentItem.defaultProps = {
  componentRef: null,
  isSubComment: false,
  onLayout: () => {}
};

export default memo(wrap(CommentItem, 'defaultProps'), () => true);

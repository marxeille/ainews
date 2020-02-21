import React, { useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import TextButton from 'AINews/src/elements/TextButton';
import { t } from 'AINews/src/utils/LocalizationUtils';
import NewsInteractiveButton from 'AINews/src/elements/NewsInteractiveButton';
import images from '../../../../../assets/images';
import {
  upvoteComment,
  unupvoteComment,
  downvoteComment,
  undownvoteComment,
  retryCommentPost,
  retryReplyComment
} from '../../../../store/actions/user';

type Props = {
  id: String,
  isSubComment: boolean,
  sendingStatus: boolean,
  onReplyPress: () => void,
  upVoteNumber: number,
  downVoteNumber: number,
  vote: number,
  postId: String,
  content: String,
  parentId: String
};

const CommentInteractiveSection = (props: Props) => {
  const {
    id,
    isSubComment,
    sendingStatus,
    onReplyPress,
    upVoteNumber,
    downVoteNumber,
    vote,
    postId,
    content,
    parentId
  } = props;

  const dispatch = useDispatch();
  const replyButtonRef = useRef();

  function onUpvotePress() {
    if (vote === 1) {
      dispatch(unupvoteComment({ commentId: id, type: isSubComment ? 1 : 0 }));
    } else {
      dispatch(upvoteComment({ commentId: id, type: isSubComment ? 1 : 0 }));
    }
  }

  function onDownvotePress() {
    if (vote === -1) {
      dispatch(
        undownvoteComment({ commentId: id, type: isSubComment ? 1 : 0 })
      );
    } else {
      dispatch(downvoteComment({ commentId: id, type: isSubComment ? 1 : 0 }));
    }
  }

  if (sendingStatus === 'failed') {
    return (
      <TextButton
        textCls="fs-13 ff-sf tr"
        callback={onRetryPress}
        label={t('newsDetails.retryReplying')}
      />
    );
  }

  async function onRetryPress() {
    if (!isSubComment) {
      dispatch(retryCommentPost({ id, postId, content }));
    } else {
      dispatch(retryReplyComment({ id, commentId: parentId, content }));
    }
  }

  if (sendingStatus === 'sending') {
    return <ActivityIndicator />;
  }

  return (
    <View ref={replyButtonRef} collapsable={false} cls="flx-row aic">
      <NewsInteractiveButton
        isSmallSize
        value={upVoteNumber - downVoteNumber}
        image={vote === 1 ? images.upvote_selected : images.upvote}
        callback={onUpvotePress}
        rightButton={{
          image: vote === -1 ? images.downvote_selected : images.downvote,
          callback: onDownvotePress
        }}
      />
      <View cls="wd-35" />
      <NewsInteractiveButton
        isSmallSize
        value={t('common.reply')}
        callback={() => {
          replyButtonRef.current.measure((fx, fy, width, height, px, py) => {
            onReplyPress(id, null, py);
          });
        }}
      />
    </View>
  );
};

export default memo(
  wrap(CommentInteractiveSection),
  (prevProps: Props, nextProps: Props) => {
    prevProps.sendingStatus === nextProps.sendingStatus;
  }
);

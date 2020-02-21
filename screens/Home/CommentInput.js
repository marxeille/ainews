import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Dimensions,
  Platform
} from 'react-native';

import { sharePost, bookMarkPost } from 'AINews/src/utils/post';
import { wrap, sizes } from '@agiletechvn/react-theme';
import NewsInteractiveButton from 'AINews/src/elements/NewsInteractiveButton';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import images from '../../../assets/images';
import SendCommentButton from '../../elements/SendCommentButton';

import { t } from '../../utils/LocalizationUtils';

const deviceWidth = Dimensions.get('window').width;

type Props = {
  componentRef?: React.Ref,
  autoFocus?: boolean,
  onComment?: Function,
  onEdit?: Function,
  replyingCommentId?: String,
  onCancelReplyingComment?: () => void,
  onLayout?: () => void,
  post: Object,
  onMoveToCommentSection: Function
};

function CommentInput(props: Props) {
  const {
    componentRef,
    autoFocus,
    onComment,
    onEdit,
    replyingCommentId,
    onCancelReplyingComment,
    onLayout,
    post,
    onMoveToCommentSection
  } = props;

  const [comment, setComment] = useState('');
  const [bookmarkStatus, setBookmarkStatus] = useState(post && post.saved);

  const defaultInputWidth = deviceWidth - 2 * sizes.ph2 - 27 - 30;
  const unusedInputWidth = deviceWidth - 2 * sizes.ph2 - 27 - 30 * 2 - 40 - sizes.mr3 - 20;

  const [inputWidth, setInputWidth] = useState(unusedInputWidth);

  const textInputRef = useRef();
  const _editingComment = useRef(null);

  const comments = useSelector(state => state.comments);

  if (componentRef) {
    componentRef.current = {
      reset,
      focus,
      focusForEditing
    };
  }

  function filterCommentTag(_comment) {
    const components = _comment.match(/^@\("(.+)","([a-z,0-9,-]+)"\) /);
    return components ? components[0] : '';
  }

  function filterCommentContent(_comment) {
    return _comment.replace(/^@\("(.+)","([a-z,0-9,-]+)"\) /, '');
  }

  async function handleSendPress() {
    let content = comment;
    if (replyingCommentId) {
      const tagName = comments[replyingCommentId].user.fullName;
      const tagId = comments[replyingCommentId].user.id;
      content = `@("${tagName}","${tagId}") ${comment}`;
    }

    let shouldResetCommentBox = true;
    if (_editingComment.current) {
      const { parentCmtId, commentId, tag } = _editingComment.current;
      const { remoteId } = comments[commentId];
      const remoteParentCmtId = parentCmtId
        ? comments[parentCmtId].remoteId
        : null;

      _editingComment.current = null;

      shouldResetCommentBox = await onEdit({
        localId: commentId,
        parentCmtId,
        remoteId,
        remoteParentCmtId,
        content: tag + content
      });
    } else {
      shouldResetCommentBox = await onComment(content);
    }

    if (shouldResetCommentBox) {
      setComment('');
    }
  }

  function reset() {
    _editingComment.current = null;
    setComment('');
  }

  function focus() {
    if (textInputRef.current) {
      textInputRef.current.focus();
      setComment('');
    }
  }

  function focusForEditing({ parentCmtId, commentId }) {
    if (textInputRef.current) {
      textInputRef.current.focus();
      const { content } = comments[commentId];
      const tag = filterCommentTag(content);
      const contentWithoutTag = filterCommentContent(content);
      _editingComment.current = {
        parentCmtId,
        commentId,
        tag
      };
      setComment(contentWithoutTag);
    }
  }

  function onInputFocus() {
    LayoutAnimation.easeInEaseOut();
    setInputWidth(defaultInputWidth);
  }

  function onInputBlur() {
    LayoutAnimation.easeInEaseOut();
    setInputWidth(unusedInputWidth);
  }

  function onCommentPress() {
    onMoveToCommentSection && onMoveToCommentSection();
  }

  async function onSharePress() {
    if (post && post.id) {
      await sharePost(post.id);
    }
  }

  function onBookMarkPost() {
    bookMarkPost(post);
    // Pretend that the request will be success
    setBookmarkStatus(bookmarkStatus ? 0 : 1);
  }

  return (
    <View
      onLayout={onLayout}
      cls="bg-white pv2 ph3 b--commentBoxBorder btw-1 jcc"
    >
      <View>
        {replyingCommentId && comments[replyingCommentId] ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onCancelReplyingComment}
            cls="pvn-5"
          >
            <View cls="flx-row aic">
              <Image
                cls="wd-16 hg-16"
                source={images.closeReply}
                resizeMode="contain"
              />
              <View cls="wd-4" />
              <Text cls="ff-sf">{`${t('newsDetails.replying')} `}</Text>
              <Text cls="ff-sfB">
                {comments[replyingCommentId].user.fullName}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <View cls="jcc">
        <View
          cls="zIndexFn-1 pv1"
          style={{
            width: inputWidth
          }}
        >
          <TextInput
            ref={textInputRef}
            autoFocus={autoFocus}
            autoCorrect={false}
            cls={`fs-16 ff-sf bg-commentBox ph3 maxhg-120 ${
              Platform.OS === 'ios' ? 'ptn-10 pbn-10' : 'pvn-10'
            } br4`}
            placeholder={
              replyingCommentId
                ? t('newsDetails.enterReply')
                : t('newsDetails.enterComment')
            }
            value={comment}
            multiline
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onChangeText={setComment}
          />
        </View>
        <View cls="absolute right-0 zIndexFn-0 aic jcc">
          <View cls="flx-row aic jcfe">
            <View>
              <DebounceTouch
                hitSlop={{
                  top: 15,
                  left: 15,
                  bottom: 15,
                  right: 15
                }}
                activeOpacity={0.6}
                onPress={onCommentPress}
              >
                <View cls="flx-row aic">
                  <View cls="wd-35 hg-30 aic jcc">
                    <Image
                      cls="wd-24 hg-24"
                      source={images.comment}
                      resizeMode="contain"
                    />
                    <View cls="absolute right-0 top-0 bg-coral wd-20 pvn-2 br3 aic jcc">
                      <Text cls="white fs-10 ff-sfR">
                        {(post && post.commentNumber) || 0}
                      </Text>
                    </View>
                  </View>
                </View>
              </DebounceTouch>
            </View>
            <View cls="wd-30 aic jcc">
              <NewsInteractiveButton
                image={images.share}
                callback={onSharePress}
              />
            </View>
            <View cls="wd-30 aic jcc mr3">
              <NewsInteractiveButton
                image={bookmarkStatus ? images.bookmarked : images.bookmark}
                callback={onBookMarkPost}
              />
            </View>
            <SendCommentButton
              enabled={comment.replace(/^\s+/, '') !== ''}
              callback={handleSendPress}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

CommentInput.defaultProps = {
  componentRef: null,
  autoFocus: false,
  onComment: () => {},
  onEdit: () => {},
  replyingCommentId: null,
  onCancelReplyingComment: () => {},
  onLayout: () => {}
};

export default wrap(CommentInput, 'defaultProps');

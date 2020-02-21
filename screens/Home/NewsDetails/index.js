import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
  Platform,
  Dimensions
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { wrap } from '@agiletechvn/react-theme';
import { Navigation } from 'react-native-navigation';
import { WINDOW_HEIGHT, showLoginRequiredAlert } from 'AINews/src/utils/trivia';
// import { flushComments } from 'AINews/src/store/actions/comments';
import { getPostDetails } from 'AINews/src/store/actions/posts';
import { editComment, editSubComment } from 'AINews/src/store/actions/user';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import useComments from '../../../hooks/useComments';
import CommentInput from '../CommentInput';
import SingleOERFlatList from '../../../components/common/SingleOERFlatList';
import CommentItem from './CommentItem';
import NewsAuthorSection from '../NewsAuthorSection';
import CommentsFilter from '../SocialNewsItem/CommentsFilter';
import ReadingBar from './ReadingBar';
import RelatedPosts from './RelatedPosts';

type Props = {
  id: String,
  renderNewsDetails: () => React.Component,
  componentRef: React.Ref,
  shouldRenderAuthor?: boolean,
  rootComponentId: String,
  hidePost: Function,
  isUsedInPhotoList?: boolean,
  setAuthorHeight: Function,
  index: Number,
  setAuthorHeader: Function,
  setBackHeader: Function
};

const NewsDetails = (props: Props) => {
  const {
    id,
    renderNewsDetails,
    componentRef,
    shouldRenderAuthor,
    rootComponentId,
    hidePost,
    isUsedInPhotoList,
    setAuthorHeight,
    index,
    setAuthorHeader,
    setBackHeader
  } = props;

  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);
  const [filterType, setFilterType] = useState('top');
  const [replyingCommentId, setReplyingCommentId] = useState(null);

  const parentCommentId = useRef(null);
  const scrollViewPos = useRef(new Animated.Value(0));

  const flatListRef = useRef();
  const interactiveSectionRef = useRef();

  const postHeight = useRef(0);
  const authorHeight = useRef(0);
  const singleOERFlatListHeight = useRef(0);
  const keyboardHeight = useRef(0);
  const commentInputHeight = useRef(0);

  const commentItemRefs = useRef({});
  const pendingCommentId = useRef(null);
  const readingBarRef = useRef();
  const currentOffsetReading = useRef(0);
  const currentOffsetY = useRef(0);
  const isInCommentSection = useRef(false);

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
    type: filterType,
    reverseQueuingComments: true
  });

  // const dispatch = useDispatch();
  const [post, setPost] = useState(useSelector(state => state.posts[id]));
  const token = useSelector(state => state.token.token);

  if (componentRef) {
    componentRef.current = {
      focusOnTextInput,
      authorHeight: authorHeight.current
    };
  }

  // useEffect(() => () => {
  //   dispatch(flushComments())
  // }, [dispatch])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    const navigationButtonPressedListener = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        console.log('Press button ', buttonId);
      }
    );
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
      navigationButtonPressedListener.remove();
    };
  }, [load]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!post) {
      (async () => {
        // setLoading(true);
        const details = await callSagaRequest(getPostDetails, { id });
        setPost(details);
        // const { content } = details;
        // setDisplayContent(content);
        // setLoading(false);
        // if (_autoShowKeyboard.current && _newsDetailsRef.current) {
        // _newsDetailsRef.current.focusOnTextInput();
        // }
      })();
    }
  }, [id, post]);

  const onReplyPress = useCallback(
    (subCommentId, commentId = null, pageOffsetY = 0) => {
      setReplyingCommentId(subCommentId);
      parentCommentId.current = commentId;
      focusOnTextInput();

      flatListRef.current.scrollToOffset({
        offset:
          scrollViewPos.current._value
          - (WINDOW_HEIGHT - pageOffsetY)
          + 160
          + keyboardHeight.current,
        animated: true
      });
    },
    []
  );

  const renderRelatedPosts = useCallback(
    wrap(() => <RelatedPosts postId={id} />),
    [id]
  );

  const renderListHeaderComponent = useCallback(
    wrap(() => (
      <View onLayout={onListHeaderComponentLayout} cls="bg-white">
        {isUsedInPhotoList ? null : (
          <View cls="">
            <View onLayout={onAuthorComponentLayout}>
              <NewsAuthorSection
                postId={id}
                author={post.author}
                createdAt={post.createdAt}
                saved={post.saved}
                hidePost={hidePost}
                inDetailsScreen
              />
            </View>
            {renderNewsDetails()}
          </View>
        )}
        {renderRelatedPosts()}
        <View cls="pb2 bg-paleGray">
          <CommentsFilter onFilterChanged={onFilterChanged} />
        </View>
      </View>
    )),
    [renderNewsDetails]
  );

  const onCommentShouldBeEdited = useCallback(({ parentCmtId, commentId }) => {
    if (interactiveSectionRef.current) {
      interactiveSectionRef.current.focusForEditing({ parentCmtId, commentId });
    }
  }, []);

  function renderListFooterComponent() {
    if (loading) {
      return <ActivityIndicator />;
    }

    return null;
  }

  const renderItem = useCallback(
    ({ item }) => {
      if (!commentItemRefs.current[item.id]) {
        commentItemRefs.current[item.id] = { current: null };
      }

      const onCommentItemLayout = () => {
        if (item.id && item.id === pendingCommentId.current) {
          commentItemRefs.current[pendingCommentId.current].current.measure(
            (fx, fy, width, height, px, py) => {
              flatListRef.current.scrollToOffset({
                offset:
                  scrollViewPos.current._value
                  + (height + py)
                  - WINDOW_HEIGHT
                  + commentInputHeight.current
                  + 60,
                animated: true
              });
            }
          );
          pendingCommentId.current = null;
        }
      };

      return (
        <CommentItem
          onCommentShouldBeEdited={onCommentShouldBeEdited}
          remove={remove}
          parentId={id}
          componentRef={commentItemRefs.current[item.id]}
          id={item.id}
          onLayout={onCommentItemLayout}
          onReplyPress={onReplyPress}
        />
      );
    },
    [onCommentShouldBeEdited, remove, id, onReplyPress]
  );

  if (!post) {
    return null;
  }

  function keyboardDidShow({ endCoordinates: { height } }) {
    if (keyboardHeight.current) {
      return;
    }
    keyboardHeight.current = height;
  }

  function keyboardDidHide() {
    if (interactiveSectionRef.current) {
      // We want to keep the comment
      // interactiveSectionRef.current.reset();
    }
    setReplyingCommentId(null);
  }

  async function onComment(content) {
    if (!token) {
      showLoginRequiredAlert(rootComponentId);
      return false;
    }

    Keyboard.dismiss();

    if (!replyingCommentId) {
      const localId = `local_${Date.now()}`;
      add(content, localId);
      pendingCommentId.current = localId;
    } else if (!parentCommentId.current) {
      pendingCommentId.current = replyingCommentId;
      commentItemRefs.current[replyingCommentId].current.reply(content);
      setReplyingCommentId(null);
    } else {
      pendingCommentId.current = parentCommentId.current;
      commentItemRefs.current[parentCommentId.current].current.reply(content);
      setReplyingCommentId(null);
      parentCommentId.current = null;
    }
    return true;
  }

  async function onEdit({
    localId,
    parentCmtId,
    remoteId,
    remoteParentCmtId,
    content
  }) {
    if (!token) {
      showLoginRequiredAlert(rootComponentId);
      return false;
    }

    Keyboard.dismiss();
    if (parentCmtId) {
      commentItemRefs.current[parentCmtId].current.editComment(
        localId,
        content
      );
      callSagaRequest(editSubComment, {
        parentCmtId: remoteParentCmtId || parentCmtId,
        commentId: remoteId || localId,
        localCommentId: localId,
        content
      });
    } else {
      edit(localId, content);
      callSagaRequest(editComment, {
        postId: id,
        commentId: remoteId || localId,
        localCommentId: localId,
        content
      });
    }

    return true;
  }

  function onCancelReplyingComment() {
    setReplyingCommentId(null);
    parentCommentId.current = null;
  }

  function onListHeaderComponentLayout({
    nativeEvent: {
      layout: { height }
    }
  }) {
    postHeight.current = height;
  }

  function onAuthorComponentLayout({
    nativeEvent: {
      layout: { height }
    }
  }) {
    authorHeight.current = height;

    if (setAuthorHeight && (index || index === 0)) {
      setAuthorHeight(
        {
          authorheight: height,
          currentOffsetY: currentOffsetY.current,
          post
        },
        index
      );
    }
  }

  function onCommentInputLayout({
    nativeEvent: {
      layout: { height }
    }
  }) {
    commentInputHeight.current = height;
  }

  function onCommentListLayout({
    nativeEvent: {
      layout: { height }
    }
  }) {
    singleOERFlatListHeight.current = height;
  }

  function onMoveToCommentSection() {
    const commentBlockOffset = postHeight.current - 47;

    if (
      currentOffsetY.current >= commentBlockOffset
      || (isInCommentSection.current
        && currentOffsetY.current < commentBlockOffset)
    ) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: true
      });
      isInCommentSection.current = false;
    } else {
      flatListRef.current.scrollToOffset({
        offset: postHeight.current - 47,
        animated: true
      });
      isInCommentSection.current = true;
    }
  }

  function onFilterChanged(type) {
    setFilterType(type);
  }

  function focusOnTextInput() {
    if (interactiveSectionRef.current) {
      interactiveSectionRef.current.focus();
    }
  }

  const renderMainView = wrap(() => (
    <View cls="flx-i bg-paleGray">
      <SingleOERFlatList
        // NOTE: Enabling removeClippedSubviews makes the list's items unmeasurable,
        // so it is not possible to scroll to the position of a removed item.
        // This is actually a hack that can hurt the app performance, but I don't know how to truely fix this. Some other developers please help :(
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollViewPos.current
                }
              }
            }
          ],
          {
            listener: event => {
              const offsetY = event.nativeEvent.contentOffset.y;

              currentOffsetY.current = offsetY;

              if (setAuthorHeight && (index || index === 0)) {
                setAuthorHeight(
                  {
                    authorheight: authorHeight.current,
                    currentOffsetY: offsetY,
                    post
                  },
                  index
                );
              }

              if (offsetY >= authorHeight.current) {
                setAuthorHeader && setAuthorHeader(post);
              } else {
                setBackHeader && setBackHeader();
              }

              if (offsetY > currentOffsetReading.current) {
                if (readingBarRef && readingBarRef.current) {
                  readingBarRef.current.setBar(
                    Number(
                      (
                        offsetY
                        / (postHeight.current - Dimensions.get('window').height)
                      ).toFixed(2)
                    )
                  );
                  currentOffsetReading.current = offsetY;
                }
              }
            }
          }
        )}
        onScrollBeginDrag={() => {
          if (Platform.OS === 'android') {
            Keyboard.dismiss();
          }
        }}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        componentRef={flatListRef}
        onLayout={onCommentListLayout}
        cls="flx-i"
        data={[...queuingComments, ...comments]}
        ListHeaderComponent={renderListHeaderComponent}
        ListFooterComponent={renderListFooterComponent}
        renderItem={wrap(renderItem)}
        onEndReached={load}
        onEndReachedThreshold={0.5}
        keyExtractor={item => `${item.id}`}
      />
      <CommentInput
        onLayout={onCommentInputLayout}
        componentRef={interactiveSectionRef}
        onComment={onComment}
        onEdit={onEdit}
        replyingCommentId={replyingCommentId}
        post={post}
        onCancelReplyingComment={onCancelReplyingComment}
        onMoveToCommentSection={onMoveToCommentSection}
      />
    </View>
  ));

  return (
    <SafeAreaView
      cls="flx-i"
      onLayout={({
        nativeEvent: {
          layout: { height }
        }
      }) => {
        setKeyboardVerticalOffset(WINDOW_HEIGHT - height);
      }}
      forceInset={{ top: 'never', bottom: 'always' }}
    >
      {post && post.id ? <ReadingBar componentRef={readingBarRef} /> : null}
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          cls="flx-i"
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          {renderMainView()}
        </KeyboardAvoidingView>
      ) : (
        renderMainView()
      )}
    </SafeAreaView>
  );
};

NewsDetails.defaultProps = {
  shouldRenderAuthor: false,
  isUsedInPhotoList: false
};

export default wrap(NewsDetails, 'defaultProps');

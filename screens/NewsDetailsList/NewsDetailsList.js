import React, {
  useState,
  useRef,
  // useContext,
  useEffect,
  useCallback,
  memo
} from 'react';
import { View, FlatList, Platform, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { wrap } from '@agiletechvn/react-theme';
import CommonNewsDetails from 'AINews/src/screens/Home/CommonNewsItem/CommonNewsDetails';
import SocialNewsDetails from 'AINews/src/screens/Home/SocialNewsItem/SocialNewsDetails';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { getNextPost } from 'AINews/src/store/actions/posts';
import { WINDOW_WIDTH, isIOS } from 'AINews/src/utils/trivia';

type Props = {
  id: String,
  initialPostDisplayType: Number,
  initialLastId: Number,
  componentId: String,
  filters?: Object,
  hidePost?: Function
};

const NewsDetailsList = (props: Props) => {
  const {
    componentId,
    filters,
    hidePost,
    id,
    initialPostDisplayType,
    initialLastId
  } = props;

  const [postMetaData, setPostMetaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const lastId = useRef(id);
  const postArrayRef = useRef([]);
  const headerType = useRef('back');
  const currentPost = useRef({});

  useEffect(() => {
    if (id) {
      setPostMetaData([
        {
          id,
          displayType: initialPostDisplayType
        }
      ]);
      lastId.current = initialLastId;
      loadNextPost();
    }
  }, [id, initialPostDisplayType, initialLastId, loadNextPost]);

  useEffect(() => {
    if (currentPage === postMetaData.length - 1) {
      loadNextPost();
    }
  }, [currentPage, postMetaData, loadNextPost]);

  function onHidePost(postId) {
    hidePost(postId);
  }

  const setAuthorHeight = useCallback((postInfo, postIndex) => {
    postArrayRef.current[postIndex] = postInfo;
  }, []);

  function renderItem({ item, index }) {
    if (item.displayType === 0) {
      return (
        <View cls={`wd-${WINDOW_WIDTH}`}>
          <CommonNewsDetails
            id={item.id}
            componentId={componentId}
            hidePost={() => onHidePost(item.id)}
            shouldSkipLoadDetails={index > 0}
            setAuthorHeight={setAuthorHeight}
            index={index}
            setAuthorHeader={setAuthorHeader}
            setBackHeader={setBackHeader}
          />
        </View>
      );
    }

    if (item.displayType === 1) {
      return (
        <View cls={`wd-${WINDOW_WIDTH}`}>
          <SocialNewsDetails
            id={item.id}
            componentId={componentId}
            shouldLoadFullContent
            hidePost={() => onHidePost(item.id)}
            shouldSkipLoadDetails={index > 0}
            setAuthorHeight={setAuthorHeight}
            index={index}
            setAuthorHeader={setAuthorHeader}
            setBackHeader={setBackHeader}
          />
        </View>
      );
    }

    return null;
  }

  function onMomentumScrollEnd(event) {
    const xOffset = event?.nativeEvent?.contentOffset?.x || 0;
    const newCurrentPage = Math.ceil(xOffset / WINDOW_WIDTH);

    setCurrentPage(newCurrentPage);
    const currentPostInfo = postArrayRef.current[newCurrentPage];
    if (currentPostInfo) {
      if (currentPostInfo.currentOffsetY >= currentPostInfo.authorheight) {
        setAuthorHeader(currentPostInfo.post);
      } else {
        setBackHeader();
      }
    }
  }

  const setAuthorHeader = useCallback(
    post => {
      if (
        headerType.current !== 'author'
        || !currentPost.current.id
        || (currentPost.current.id && currentPost.current.id !== post.id)
      ) {
        currentPost.current = post;

        Navigation.mergeOptions(componentId, {
          topBar: {
            title: {
              ...Platform.select({
                ios: {
                  component: {
                    name: 'NewsDetailHeader',
                    alignment: 'center',
                    passProps: {
                      post
                    }
                  }
                },
                android: {
                  text: post.title
                }
              })
            }
          }
        });
        headerType.current = 'author';
      }
    },
    [componentId]
  );

  const setBackHeader = useCallback(() => {
    if (headerType.current !== 'back') {
      Navigation.mergeOptions(componentId, {
        topBar: {
          title: {
            ...Platform.select({
              ios: {
                component: {
                  name: 'EmptyView',
                  alignment: 'center'
                }
              },
              android: {
                text: ''
              }
            })
          }
        }
      });

      headerType.current = 'back';
    }
  }, [componentId]);

  const loadNextPost = useCallback(async () => {
    const result = await callSagaRequest(getNextPost, {
      lastId: lastId.current || '',
      filters
    });
    lastId.current = result.lastId;
    setPostMetaData(current => [
      ...current,
      {
        id: result.id,
        displayType: result.displayType
      }
    ]);
  }, [filters]);

  return (
    <View cls="flx-i">
      <FlatList
        cls="flx-i"
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={postMetaData}
        renderItem={wrap(renderItem)}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyExtractor={item => `${item.id}`}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      />
      {isIOS ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 10
          }}
        />
      ) : null}
    </View>
  );
};

NewsDetailsList.defaultProps = {
  filters: null,
  hidePost: () => {}
};

export default memo(wrap(NewsDetailsList, 'defaultProps'), () => true);

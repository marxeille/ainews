import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StatusBar, Platform, LayoutAnimation } from 'react-native';
import { useSelector } from 'react-redux';
import { t } from 'AINews/src/utils/LocalizationUtils';
import { WINDOW_WIDTH } from 'AINews/src/utils/trivia';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';
import { Navigation } from 'react-native-navigation';
import NewsDetails from '../NewsDetails';
import images from '../../../../assets/images';
import colors from '../../../themes/colors';
import { callSagaRequest } from '../../../utils/RequestHandler';
import { getPostDetails } from '../../../store/actions/posts';
import NewsInteractiveSection from '../NewsInteractiveSection';

type Props = {
  id: String,
  componentId: String,
  autoShowKeyboard?: boolean,
  hidePost: Function,
  shouldSkipLoadDetails?: Boolean,
  setAuthorHeight: Function,
  index: Number,
  setAuthorHeader: Function,
  setBackHeader: Function
};

const CommonNewsDetails = (props: Props) => {
  const {
    id,
    componentId,
    autoShowKeyboard,
    hidePost,
    shouldSkipLoadDetails,
    setAuthorHeight,
    index,
    setAuthorHeader,
    setBackHeader
  } = props;

  const post = useSelector(state => state.posts[id]);
  const [displayContent, setDisplayContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const _autoShowKeyboard = useRef(autoShowKeyboard);
  const _newsDetailsRef = useRef();
  const loadedPost = useRef();

  useEffect(() => {
    if (!shouldSkipLoadDetails || !post.content) {
      return;
    }
    if (loadedPost.current !== post) {
      const { content } = post;

      if (content) {
        LayoutAnimation.easeInEaseOut();
        setDisplayContent(content);
        setLoading(false);
      }
    }
    loadedPost.current = post;
  }, [post, shouldSkipLoadDetails]);

  useEffect(() => {
    if (shouldSkipLoadDetails) {
      return;
    }
    (async () => {
      setLoading(true);
      const details = await callSagaRequest(getPostDetails, { id });
      const { content } = details;
      LayoutAnimation.easeInEaseOut();
      setDisplayContent(content);
      setLoading(false);
      if (_autoShowKeyboard.current && _newsDetailsRef.current) {
        // _newsDetailsRef.current.focusOnTextInput();
      }
    })();
  }, [id, shouldSkipLoadDetails]);

  const getMainCategory = useCallback(() => {
    if (!Array.isArray(categories) || categories.length === 0) {
      return 'Tổng hợp';
    }

    return categories[0].name;
  }, [categories]);

  const renderNewsDetails = useCallback(() => {
    const renderNewsContent = () => {
      if (loading) {
        return (
          <View>
            <Text cls="fs-14 ff-sf">{t('newsDetails.loadingContent')}</Text>
            <View cls="hg-22" />
          </View>
        );
      }

      const renderingContent = displayContent.map((_content, index) => {
        if (_content.type === 'text') {
          return (
            <View key={index}>
              <Text cls="fs-14 ff-sf commonBlack">{_content.content}</Text>
              <View cls="hg-22" />
            </View>
          );
        }

        if (_content.type === 'image') {
          return (
            <View cls="mhnNeg-12" key={index}>
              <ImageWithPlaceholder
                width={WINDOW_WIDTH}
                height={WINDOW_WIDTH * 0.6}
                source={{ uri: _content.link }}
              />
              {index !== displayContent.length - 1 ? (
                <View cls="hg-22" />
              ) : null}
            </View>
          );
        }

        return null;
      });

      return (
        <View>
          {renderingContent}
          <View cls="mhnNeg-12 bbw-1 b--separatingLine">
            <View cls="bg-newsSeparatingLine hg-1 mhn-14" />
            <NewsInteractiveSection
              id={id}
              onNewsDetailsShouldDisplay={onNewsDetailsShouldDisplay}
            />
          </View>
        </View>
      );
    };

    return (
      <View cls="phn-12">
        {/* <View cls="hg-10 bg-empty mhnNeg-12 btw-1 b--separatingLine" /> */}
        {/* <View cls="hg-12" /> */}
        <View cls="pan-8">
          <Text cls="fs-24 blackish ff-sfB">{title}</Text>
        </View>
        <View cls="hg-4" />
        <View cls="flx-row aic phn-8">
          <View cls="wd-20 hg-20 brs-3 b--separatingLine bw-1" />
          <View cls="wd-8" />
          <Text cls="fs-12 blackish ff-sfB">{getMainCategory()}</Text>
        </View>
        <View cls="hg-22" />
        {renderNewsContent()}
      </View>
    );
  }, [title, getMainCategory, loading, displayContent, id]);

  if (!post) {
    return null;
  }

  const { title, categories } = post;

  function onNewsDetailsShouldDisplay() {}

  return (
    <NewsDetails
      rootComponentId={componentId}
      shouldRenderAuthor
      id={id}
      renderNewsDetails={renderNewsDetails}
      componentRef={_newsDetailsRef}
      hidePost={hidePost}
      setAuthorHeight={setAuthorHeight}
      index={index}
      setAuthorHeader={setAuthorHeader}
      setBackHeader={setBackHeader}
    />
  );
};

CommonNewsDetails.defaultProps = {
  autoShowKeyboard: false,
  shouldSkipLoadDetails: false
};

class CommontNewDetailsWrap extends React.Component {
  static options = () => ({
    topBar: {
      backButton: {
        icon: images.back,
        color: colors.commonGrey
      }
      // rightButtons: [
      //   {
      //     id: 2,
      //     icon: images.report
      //   },
      //   {
      //     id: 1,
      //     icon: images.bookmark
      //   },
      //   {
      //     id: 0,
      //     icon: images.share
      //   }
      // ]
    }
  });

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  componentWillAppear() {
    if (Platform.OS === 'android') {
      // StatusBar.setBackgroundColor('white');
      // StatusBar.setBarStyle('dark-content');
    }
  }

  render() {
    return <CommonNewsDetails {...this.props} />;
  }
}

export default CommontNewDetailsWrap;

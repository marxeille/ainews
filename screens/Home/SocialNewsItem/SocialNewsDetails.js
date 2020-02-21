import React, { useRef, useCallback } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import SocialNewsItem from '.';
import NewsDetails from '../NewsDetails';
import images from '../../../../assets/images';
import colors from '../../../themes/colors';

type Props = {
  id: String,
  componentId: String,
  autoShowKeyboard?: boolean,
  shouldRenderAuthor?: boolean,
  shouldLoadFullContent?: boolean,
  hidePost: Function,
  shouldSkipLoadDetails?: Boolean,
  isUsedInPhotoList?: boolean,
  setAuthorHeader: Function,
  setBackHeader: Function
};

const SocialNewsDetails = (props: Props) => {
  const {
    id,
    componentId,
    autoShowKeyboard,
    shouldRenderAuthor,
    shouldLoadFullContent,
    hidePost,
    shouldSkipLoadDetails,
    isUsedInPhotoList,
    setAuthorHeader,
    setBackHeader
  } = props;

  const _autoShowKeyboard = useRef(autoShowKeyboard);
  const _newsDetailsRef = useRef();
  const _shouldLoadFullContent = useRef(shouldLoadFullContent);

  const onLoadedFullContent = useCallback(() => {
    if (_autoShowKeyboard.current && _newsDetailsRef.current) {
      _newsDetailsRef.current.focusOnTextInput();
    }
  }, []);

  const renderNewsDetails = useCallback(
    () => (
      <SocialNewsItem
        id={id}
        onLoadedFullContent={onLoadedFullContent}
        shouldLoadFullContent={_shouldLoadFullContent.current}
        isUsedInNewsDetails
        shouldSkipLoadDetails={shouldSkipLoadDetails}
        shouldShowAuthor={false}
      />
    ),
    [id, onLoadedFullContent, shouldSkipLoadDetails]
  );

  return (
    <NewsDetails
      shouldRenderAuthor={shouldRenderAuthor}
      rootComponentId={componentId}
      componentRef={_newsDetailsRef}
      id={id}
      renderNewsDetails={renderNewsDetails}
      hidePost={hidePost}
      isUsedInPhotoList={isUsedInPhotoList}
      setAuthorHeader={setAuthorHeader}
      setBackHeader={setBackHeader}
    />
  );
};

SocialNewsDetails.defaultProps = {
  autoShowKeyboard: false,
  shouldRenderAuthor: false,
  shouldLoadFullContent: false,
  shouldSkipLoadDetails: false,
  isUsedInPhotoList: false
};

class SocialNewsDetailsWrap extends React.Component {
  static options = () => ({
    topBar: {
      backButton: {
        icon: images.back,
        color: colors.commonGrey
      }
      //     rightButtons: [
      //       {
      //         id: 2,
      //         icon: images.report
      //       },
      //       {
      //         id: 1,
      //         icon: images.bookmark
      //       },
      //       {
      //         id: 0,
      //         icon: images.share
      //       }
      //     ]
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
    return <SocialNewsDetails {...this.props} />;
  }
}

export default SocialNewsDetailsWrap;

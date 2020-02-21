import React, { useState, useCallback } from 'react';
import {
  View,
  ImageRequireSource,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import colors from 'AINews/src/themes/colors';

import SocialNewsItem from 'AINews/src/screens/Home/SocialNewsItem';
import NewsInteractiveSection from 'AINews/src/screens/Home/NewsInteractiveSection';
import Bootstrap from 'AINews/src/App/Bootstrap';
import { WINDOW_WIDTH } from 'AINews/src/utils/trivia';
import ImageViewerModal from 'AINews/src/screens/Home/ImageViewerModal';
import images from 'AINews/assets/images';
import ImageWithPlaceholder from '../../../elements/ImageWithPlaceholder';

const ITEM_HEIGHT = (WINDOW_WIDTH * 2) / 3;
const ITEM_WIDTH = WINDOW_WIDTH;

type Props = {
  id: String,
  featureImages?: [ImageRequireSource]
  // initialIndex?: Number
};

const PhotoListDetails = (props: Props) => {
  const {
    id,
    featureImages
    // initialIndex
  } = props;

  const [visible, setVisible] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState();

  const renderHeader = useCallback(
    wrap(() => (
      <View>
        <SocialNewsItem
          id={id}
          shouldLoadFullContent
          isUsedInNewsDetails
          isUsedInPhotoListDetailts
        />
        <View cls="hg-10 bg-empty" />
      </View>
    )),
    [id]
  );

  function onImageClick(index) {
    setInitialImageIndex(() => index);
    setVisible(() => true);
  }

  const onNewsDetailsShouldDisplay = useCallback(() => {
    Bootstrap.push({
      component: {
        name: 'SocialNewsDetails',
        passProps: {
          id,
          isUsedInPhotoList: true
        }
      }
    });
  }, [id]);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <View>
          <TouchableWithoutFeedback onPress={() => onImageClick(index)}>
            <ImageWithPlaceholder
              width={ITEM_WIDTH}
              height={ITEM_HEIGHT}
              source={{ uri: item }}
            />
          </TouchableWithoutFeedback>
          <View cls="hg-10" />
          <View cls="hg-1 bg-newsSeparatingLine mhn-10" />
          <NewsInteractiveSection
            id={id}
            onNewsDetailsShouldDisplay={onNewsDetailsShouldDisplay}
          />
        </View>
      );
    },
    [id, onNewsDetailsShouldDisplay]
  );

  function onCancel() {
    setVisible(false);
  }

  return (
    <View cls="flx-i">
      <FlatList
        // getItemLayout={(data, index) => (
        //   { length: ITEM_HEIGHT, offset: 220 + (ITEM_HEIGHT + 10) * index, index }
        // )}
        // initialScrollIndex={initialIndex}
        ListHeaderComponent={renderHeader}
        data={featureImages}
        renderItem={wrap(renderItem)}
        keyExtractor={item => item}
        ItemSeparatorComponent={wrap(() => (
          <View cls="hg-10 bg-empty" />
        ))}
      />
      <ImageViewerModal
        featureImages={featureImages}
        visible={visible}
        initialImageIndex={initialImageIndex}
        onCancel={onCancel}
        onRequestClose={onCancel}
      />
    </View>
  );
};

PhotoListDetails.options = () => ({
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

PhotoListDetails.defaultProps = {
  featureImages: []
  // initialIndex: 0
};

export default wrap(PhotoListDetails, 'options', 'defaultProps');

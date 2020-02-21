import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import NewsAuthorSection from '../NewsAuthorSection';
import NewsInteractiveSection from '../NewsInteractiveSection';
import ImageWithPlaceholder from '../../../elements/ImageWithPlaceholder';
import { WINDOW_WIDTH } from '../../../utils/trivia';
import Bootstrap from '../../../App/Bootstrap';

type Props = {
  id: String,
  type: String,
  categoryId?: String,
  createdTime: Number,
  hidePost: Function,
  shouldNavigateToNewsDetailsList?: Boolean
};

const CommonNewsItem = (props: Props) => {
  const {
    id,
    type,
    categoryId,
    createdTime,
    hidePost,
    shouldNavigateToNewsDetailsList
  } = props;

  const {
    title,
    featureImages,
    createdAt,
    author,
    categories,
    saved
  } = useSelector(state => state.posts[id]);

  function onNewsDetailsShouldDisplay(autoShowKeyboard = false) {
    if (shouldNavigateToNewsDetailsList) {
      Bootstrap.push({
        component: {
          name: 'NewsDetailsList',
          passProps: {
            id,
            initialPostDisplayType: 0,
            initialLastId: createdTime,
            filters: {
              categoryId
            }
          }
        }
      });
    } else {
      Bootstrap.push({
        component: {
          name: 'LinkedNewsDetails',
          passProps: {
            id,
            autoShowKeyboard,
            hidePost
          }
        }
      });
    }
  }

  function getMainCategory() {
    if (!Array.isArray(categories) || categories.length === 0) {
      return '';
    }

    return categories[0].name;
  }

  function renderPostCategory() {
    const mainCategory = getMainCategory();

    if (!mainCategory) {
      return null;
    }

    return (
      <Text cls="fs-12 fw4 newsTitleCategory ff-sf">
        {mainCategory.toUpperCase()}
      </Text>
    );
  }

  if (!id) {
    return null;
  }

  return (
    <View cls="bg-white fullWidth">
      <TouchableWithoutFeedback
        onPress={() => onNewsDetailsShouldDisplay(false)}
      >
        <View>
          <NewsAuthorSection
            saved={saved}
            postId={id}
            createdAt={createdAt}
            author={author}
            type={type}
            hidePost={hidePost}
            inDetailsScreen
          />
          {featureImages
          && Array.isArray(featureImages)
          && featureImages.length > 0 ? (
            <View
              cls={`btw-1 bbw-1 blw-0 brw-0 b--empty wd-${WINDOW_WIDTH} hg-${WINDOW_WIDTH
                * 0.52}`}
            >
              <ImageWithPlaceholder
                cls="fullView"
                source={{ uri: featureImages[0] }}
              />
            </View>
            ) : null}

          <View cls="pan-12 bg-newsTitleBackground bwh b--newsTitleBackgroundBorder">
            {renderPostCategory()}
            <View cls="hg-4" />
            <Text cls="fs-15 fw5 commonBlack ff-sfB">{title}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View cls="hg-10" />
      <View cls="hg-1 bg-newsSeparatingLine mhn-10" />
      <NewsInteractiveSection
        id={id}
        onNewsDetailsShouldDisplay={() => onNewsDetailsShouldDisplay(true)}
      />
    </View>
  );
};

CommonNewsItem.defaultProps = {
  shouldNavigateToNewsDetailsList: false,
  categoryId: null
};

export default wrap(CommonNewsItem, 'defaultProps');

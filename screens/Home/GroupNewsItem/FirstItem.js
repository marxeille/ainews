import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import images from 'AINews/assets/images';
import { fixAndroidBoldCls, WINDOW_WIDTH } from 'AINews/src/utils/trivia';

import NewsInteractiveSection from '../NewsInteractiveSection';
import ImageWithPlaceholder from '../../../elements/ImageWithPlaceholder';
import Bootstrap from '../../../App/Bootstrap';

type Props = {
  id: String
};

const FirstItem = (props: Props) => {
  const { id } = props;

  const {
    title,
    featureImages,
    createdAt,
    author,
    categories,
    shortContent
  } = useSelector(state => state.posts[id]);

  function onNewsDetailsShouldDisplay() {
    Bootstrap.push({
      component: {
        name: 'LinkedNewsDetails',
        passProps: {
          id
        }
      }
    });
  }

  const onAuthorPress = () => {
    if (author && author.id) {
      Bootstrap.push({
        component: {
          name: 'Personal',
          passProps: {
            author
          }
        }
      });
    }
  };

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
      <Text cls="fs-14 newsTitleCategory ff-sfR mt3">
        {mainCategory.toUpperCase()}
      </Text>
    );
  }

  return (
    <View cls="bg-white pa3 pb0">
      <Text cls="ff-sfSb fs-18 mb3">Bài viết hàng đầu</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onNewsDetailsShouldDisplay(false)}
      >
        <View>
          <DebounceTouch
            cls="flx-row aic flx-i mv3"
            onPress={onAuthorPress}
            activeOpacity={0.7}
          >
            <View cls="circleFn-44 bg-white b--empty bwh oh ">
              {author && author.avatar ? (
                <ImageWithPlaceholder
                  source={{ uri: author.avatar }}
                  defaultImage={images.noAvatar}
                  resizeMode="contain"
                  cls="bg-white"
                />
              ) : null}
            </View>
            <View cls="wd-5" />
            <View cls="flx-i">
              <Text
                // numberOfLines={2}
                cls={fixAndroidBoldCls('fs-15 commonBlack ff-sfSb')}
              >
                {author.fullName || ''}
              </Text>
            </View>
          </DebounceTouch>
        </View>
        <View>
          {featureImages
          && Array.isArray(featureImages)
          && featureImages.length > 0 ? (
            <View cls="ba bwh b--empty br3 oh">
              <ImageWithPlaceholder
                width={WINDOW_WIDTH}
                height={WINDOW_WIDTH * 0.52}
                source={{ uri: featureImages[0] }}
              />
            </View>
            ) : null}

          <View cls="">
            {renderPostCategory()}
            <View cls="mt2">
              {title ? (
                <Text cls="fs-18 commonBlack ff-sfB">{title || ''}</Text>
              ) : (
                <Text cls="fs-18 commonBlack ff-sfB">
                  {(shortContent ? `${shortContent.slice(0, 100)}...` : '')
                    || ''}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Text cls="newsAuthorSectionTime fs-12 ff-sfR mt3">
        {moment(createdAt).fromNow()}
      </Text>

      <View cls="pWd-75">
        <NewsInteractiveSection
          id={id}
          onNewsDetailsShouldDisplay={() => onNewsDetailsShouldDisplay()}
          noPaddingHorizontal
        />
      </View>
    </View>
  );
};

FirstItem.defaultProps = {};

export default wrap(FirstItem, 'defaultProps');

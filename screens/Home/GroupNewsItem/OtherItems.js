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

const OtherItems = (props: Props) => {
  const { id } = props;

  const { title, featureImages, createdAt, author, shortContent } = useSelector(
    state => state.posts[id]
  );

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

  return (
    <View cls="bg-white pa3 pb0">
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onNewsDetailsShouldDisplay(false)}
        cls="flx-row"
      >
        <View cls="flx-i pr2">
          <DebounceTouch
            cls="flx-row aic pb3"
            onPress={onAuthorPress}
            activeOpacity={0.7}
          >
            <View cls="circleFn-24 bg-white b--empty bwh oh ">
              {author && author.avatar ? (
                <ImageWithPlaceholder
                  source={{ uri: author.avatar }}
                  defaultImage={images.noAvatar}
                  resizeMode="contain"
                  cls="bg-white"
                />
              ) : null}
            </View>
            <View cls="wd-10" />
            <View cls="flx-i">
              <Text
                // numberOfLines={2}
                cls={fixAndroidBoldCls('fs-14 aboutTitle ff-sfR')}
              >
                {author.fullName || ''}
              </Text>
            </View>
          </DebounceTouch>
          <View>
            {title ? (
              <Text cls="fs-14 commonBlack ff-sfB">{title || ''}</Text>
            ) : (
              <Text cls="fs-14 commonBlack ff-sfB">
                {(shortContent ? `${shortContent.slice(0, 100)}...` : '') || ''}
              </Text>
            )}
          </View>
        </View>

        <View>
          {featureImages
          && Array.isArray(featureImages)
          && featureImages.length > 0 ? (
            <View cls="ba bwh b--empty br3 oh">
              <ImageWithPlaceholder
                width={90}
                height={90}
                source={{ uri: featureImages[0] }}
              />
            </View>
            ) : null}
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

OtherItems.defaultProps = {};

export default wrap(OtherItems, 'defaultProps');

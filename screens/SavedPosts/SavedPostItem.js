import React, { useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import { wrap } from '@agiletechvn/react-theme';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';
import ImageButton from 'AINews/src/elements/ImageButton';
import Bootstrap from 'AINews/src/App/Bootstrap';
import images from 'AINews/assets/images';
import { t } from 'AINews/src/utils/LocalizationUtils';

type Props = {
  id: String,
  onItemShouldBeRemoved: () => void
};

function SavedPostItem({ id, onItemShouldBeRemoved }: Props) {
  const {
    author: { fullName, avatar },
    featureImages,
    displayType,
    title,
    shortContent
  } = useSelector(state => state.posts[id]);

  const actionSheetRef = useRef();

  let image = '';

  if (Array.isArray(featureImages) && featureImages.length > 0) {
    [image] = featureImages;
  } else {
    image = avatar;
  }

  function onEllipsisPress() {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  }

  function onItemPress(postId, type) {
    Bootstrap.push({
      component: {
        name: 'LinkedNewsDetails',
        passProps: {
          id: postId
        }
      }
    });
  }

  const onEllipsisItemSelect = postId => itemId => {
    if (itemId === 0) {
      onItemShouldBeRemoved(postId);
    }
  };

  return (
    <TouchableOpacity
      cls="flx-row"
      activeOpacity={0.8}
      onPress={() => onItemPress(id, displayType)}
    >
      <ImageWithPlaceholder
        brs={8}
        width={110}
        height={80}
        source={{ uri: image }}
        cls=""
      />
      <View cls="wd-12" />
      <View cls="jcc flx-i flx-row jcsb">
        <View cls="flx-i jcc">
          <Text cls="savedPostFirstLineText fs-12 ff-sf fw3">{`Bài viết • ${fullName}`}</Text>
          <View cls="hg-2" />
          <Text numberOfLines={2} cls="commonBlack fs-15 fw5 ff-sfM">
            {displayType === 0 ? title : shortContent.replace(/\n+/g, '\n')}
          </Text>
        </View>
        <View cls="wd-8" />
        <View cls="jcc">
          <ImageButton
            hitSlop={{
              top: 14,
              left: 14,
              bottom: 14,
              right: 14
            }}
            image={images.report}
            width={16}
            height={16}
            callback={onEllipsisPress}
          />
        </View>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        options={[t('savedPosts.unsave'), t('common.close')]}
        cancelButtonIndex={1}
        onPress={onEllipsisItemSelect(id)}
      />
    </TouchableOpacity>
  );
}

export default wrap(SavedPostItem);

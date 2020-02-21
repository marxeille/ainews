import type { ImageRequireSource } from 'react-native';

import React from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import FollowCategoryButton from '../../elements/FollowCategoryButton';
import ImageWithPlaceholder from '../../elements/ImageWithPlaceholder';


type Props = {
  width: Number,
  height: Number,
  title: String,
  following: boolean,
  image: ImageRequireSource,
  backgroundColor: String,
  callback: any
};

const CategoryPickUp = (props: Props) => {
  const {
    width,
    height,
    title,
    following,
    image,
    backgroundColor,
    callback
  } = props;

  return (
    <DebounceTouch activeOpacity={0.7} onPress={callback}>
      <View cls={`brs-5 oh wd-${width}`} style={{ backgroundColor }}>
        <ImageWithPlaceholder
          width={width}
          height={height}
          source={image ? { uri: image } : null}
        />
        <View cls="aic ptn-11 pbn-26">
          <Text cls="categoryPickUpTitle fs-15 ff-sfB tc">{title}</Text>
          <View cls="hg-10" />
          <FollowCategoryButton following={following} callback={callback} />
        </View>
      </View>
    </DebounceTouch>
  );
};

export default wrap(CategoryPickUp);

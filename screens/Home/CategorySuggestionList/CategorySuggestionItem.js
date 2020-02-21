import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';
import FollowButton from 'AINews/src/components/FollowButton';
import { t } from 'AINews/src/utils/LocalizationUtils';
import Bootstrap from 'AINews/src/App/Bootstrap';
import images from 'AINews/assets/images';
import colors from 'AINews/src/themes/colors';
import FollowCategoryButton from 'AINews/src/screens/Home/CategorySuggestionList/FollowCategoryButton';

type Props = {
  id: String,
  image: String,
  name: String,
  color: String
};

const CategorySuggestItem = (props: Props) => {
  const { id, name, image, color } = props;

  return (
    // <TouchableWithoutFeedback onPress={onPress}>
    <View
      cls="aic wd-150 hg-201 brs-5 oh"
      style={{ backgroundColor: color || colors.brandBlack }}
    >
      <ImageWithPlaceholder
        width={150}
        height={111}
        source={{ uri: image }}
        defaultImage={images.noAvatar}
      />
      <View cls="hg-11" />
      <Text cls="fs-15 ff-sfSb brandWhite" numberOfLines={1}>
        {name}
      </Text>
      <View cls="hg-11" />
      <FollowCategoryButton id={id} name={name} />
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default wrap(CategorySuggestItem);

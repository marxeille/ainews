import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';
import FollowButton from 'AINews/src/components/FollowButton';
import { t } from 'AINews/src/utils/LocalizationUtils';
import Bootstrap from 'AINews/src/App/Bootstrap';
import images from 'AINews/assets/images';

type Props = {
  id: String,
  avatar: String,
  fullName: String,
  numberFollow: Number
};

const AuthorSuggestionItem = (props: Props) => {
  const { id, avatar, fullName, numberFollow } = props;

  function onPress() {
    Bootstrap.push({
      component: {
        name: 'Personal',
        passProps: {
          author: {
            id,
            avatar,
            fullName
          }
        }
      }
    });
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View cls="aic wd-142 hg-180 pvn-10 aic bg-brandLightGrey brs-5 phn-10">
        <ImageWithPlaceholder
          cls="bw-1 b--brandLightGrey"
          width={66}
          height={66}
          brs={33}
          source={{ uri: avatar }}
          defaultImage={images.noAvatar}
        />
        <View cls="hg-8" />
        <Text cls="fs-15 ff-sfSb brandBlack" numberOfLines={1}>
          {fullName}
        </Text>
        <View cls="hg-4" />
        <Text cls="fs-13 ff-sf brandDarkGrey">{`${numberFollow || 0} ${t(
          'authorSuggestion.follows'
        )}`}</Text>
        <View cls="hg-20" />
        <FollowButton id={id} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default wrap(AuthorSuggestionItem);

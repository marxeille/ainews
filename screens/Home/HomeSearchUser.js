/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';
import FollowButton from 'AINews/src/components/FollowButton';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';

import Bootstrap from '../../App/Bootstrap';

const SearchUser = ({ item, index, length, containerCls }) => {
  const onUserPress = () => {
    Bootstrap.push({
      component: {
        name: 'Personal',
        passProps: {
          author: item
        }
      }
    });
  };

  return (
    <DebounceTouch cls={containerCls} onPress={onUserPress}>
      <View cls="flx-row mt3 aic">
        <ImageWithPlaceholder cls="circleFn-60" source={{ uri: item.avatar }} />
        <View cls="pl3 jcc flx-i">
          {!!item.fullName && (
            <Text cls="ff-sf fw5" numberOfLine={1}>
              {item.fullName}
            </Text>
          )}
          {!!item.about && (
            <Text cls="ff-sf fs-12" numberOfLines={1}>
              {item.about}
            </Text>
          )}
        </View>
        <FollowButton id={item.id} containerCls="hg-28" />
      </View>
      {index < length - 1 && <View cls="b--empty bwh mt3" />}
    </DebounceTouch>
  );
};

const HomeSearchUser = wrap(SearchUser);

export default HomeSearchUser;

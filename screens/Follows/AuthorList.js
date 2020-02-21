import React, { useCallback, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import SingleOERFlatList from 'AINews/src/components/common/SingleOERFlatList';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';
import FollowButton from 'AINews/src/components/FollowButton';
import useFollowedAuthors from 'AINews/src/hooks/useFollowedAuthors';
import { t } from 'AINews/src/utils/LocalizationUtils';
import Bootstrap from 'AINews/src/App/Bootstrap';
import images from 'AINews/assets/images';

type Props = {
  type: String
};

const AuthorList = (props: Props) => {
  const { type } = props;

  const { authors, refresh, load, refreshing, loading } = useFollowedAuthors({
    type
  });

  const renderItem = useCallback(
    wrap(({ item }) => (
      <TouchableOpacity
        cls="fullWidth"
        onPress={() => onAuthorPress(item.id, item.fullName, item.avatar)}
      >
        <View cls="flx-row pan-12">
          <View cls="circleFn-72 oh bwh b--empty bg-white">
            <ImageWithPlaceholder
              cls="fullView bg-white"
              source={{ uri: item.avatar }}
              defaultImage={images.noAvatar}
              resizeMode="center"
            />
          </View>
          <View cls="wd-12" />
          <View cls="jcc aifs flx-i">
            <Text cls="ff-sfB fs-20">{item.fullName}</Text>
            <View cls="hg-8" />
            <FollowButton id={item.id} />
          </View>
        </View>
      </TouchableOpacity>
    )),
    [onAuthorPress]
  );

  const onAuthorPress = useCallback((id, fullName, avatar) => {
    Bootstrap.push({
      component: {
        name: 'Personal',
        passProps: {
          author: {
            id,
            fullName,
            avatar
          }
        }
      }
    });
  }, []);

  const renderItemSeparatorComponent = useCallback(
    () => <View cls="hg-2 bg-brandSuperLightGrey" />,
    []
  );

  const renderListEmptyComponent = useCallback(
    () => (
      <View cls="pan-12 jcc aic">
        <Text cls="ff-sfR tc fs-16">
          {type === 'suggestion'
            ? t('followings.emptySuggestionList')
            : t('followings.emptyFollowingList')}
        </Text>
      </View>
    ),
    [type]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <View cls="flx-i">
      <SingleOERFlatList
        data={authors}
        onRefresh={refresh}
        refreshing={refreshing}
        renderItem={renderItem}
        onEndReached={load}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          !refreshing && loading ? <ActivityIndicator /> : null
        }
        ListEmptyComponent={wrap(renderListEmptyComponent)}
        ItemSeparatorComponent={wrap(renderItemSeparatorComponent)}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default wrap(AuthorList);

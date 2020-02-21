import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ActivityIndicator } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { t } from 'AINews/src/utils/LocalizationUtils';
import SingleOERFlatList from 'AINews/src/components/common/SingleOERFlatList';
import useSavedPosts from 'AINews/src/hooks/useSavedPosts';
import SavedPostItem from './SavedPostItem';

const SavedPosts = () => {
  const {
    savedPosts,
    removePost,
    refresh,
    refreshing,
    load,
    loading
  } = useSavedPosts({});

  const { lastReloadSavedPostTime } = useSelector(state => state.updateFlags);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    refresh();
  }, [lastReloadSavedPostTime, refresh]);

  function renderItem({ item: { id } }: any) {
    return (
      <SavedPostItem id={id} onItemShouldBeRemoved={() => removePost(id)} />
    );
  }

  const renderListEmptyComponent = memo(
    wrap(() => {
      if (!loading) {
        return (
          <View cls="aic">
            <Text cls="ff-sfR fs-16">{t('savedPosts.empty')}</Text>
          </View>
        );
      }

      return null;
    })
  );

  // const renderHeader = memo(wrap(() => (
  //   <View>
  //     {/* <Text cls="ff-sfB fs-20">{t('savedPosts.savedItems')}</Text> */}
  //     {/* <View cls="hg-17" /> */}
  //   </View>
  // )))

  const renderItemSeparatorComponent = memo(wrap(() => <View cls="hg-10" />));

  return (
    <View cls="flx-i phn-14">
      <SingleOERFlatList
        cls="flx-i"
        contentContainerCls="pvn-14"
        showsVerticalScrollIndicator={false}
        data={savedPosts}
        ListEmptyComponent={renderListEmptyComponent}
        // ListHeaderComponent={renderHeader}
        ListFooterComponent={
          loading && !refreshing ? <ActivityIndicator /> : null
        }
        ItemSeparatorComponent={renderItemSeparatorComponent}
        renderItem={wrap(renderItem)}
        keyExtractor={item => `${item.id}`}
        refreshing={refreshing}
        onEndReached={load}
        onRefresh={refresh}
      />
    </View>
  );
};

export default wrap(SavedPosts);

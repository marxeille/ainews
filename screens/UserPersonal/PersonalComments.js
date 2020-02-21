import React, { useEffect, memo } from 'react';
import { View, Text, Image } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import usePersonalComments from 'AINews/src/hooks/usePersonalComments';
import SingleOERFlatList from 'AINews/src/components/common/SingleOERFlatList';
import { t } from 'AINews/src/utils/LocalizationUtils';
import moment from 'moment';
import Bootstrap from 'AINews/src/App/Bootstrap';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';

import images from '../../../assets/images';

const ListComment = () => {
  const { comments, refresh, refreshing, load, loading } = usePersonalComments({
    pageSize: 10
  });

  useEffect(() => {
    load();
  }, [load]);

  const renderListEmptyComponent = memo(
    wrap(() => {
      if (!loading) {
        return (
          <View cls="aic mtn-16">
            <Text cls="ff-sfR fs-16">{t('personal.noComments')}</Text>
          </View>
        );
      }
      return null;
    })
  );

  function renderItem({ item, index }) {
    const {
      author: { fullName },
      post: { title, shortContent, featureImages, id, displayType },
      upVoteNumber,
      // downVoteNumber,
      createdAt,
      content
    } = item;

    let postImage = null;
    if (featureImages && featureImages[0]) {
      postImage = featureImages[0];
    }

    const onPostPress = () => {
      Bootstrap.push({
        component: {
          name: 'LinkedNewsDetails',
          passProps: {
            // shouldRenderAuthor: true,
            id,
            autoShowKeyboard: false,
            shouldLoadFullContent: displayType !== 0
          }
        }
      });
    };

    return (
      <DebounceTouch cls="bg-white pvn-20 phn-20" onPress={onPostPress}>
        <View cls="flx-row">
          {!!postImage && (
            <View cls="prn-20">
              <View cls="hg-100 wd-100 br3 oh">
                <Image
                  cls="flx-i"
                  source={{ uri: postImage }}
                  resizeMode="stretch"
                />
              </View>
            </View>
          )}

          <View cls="flx-i jcc">
            {!!title && <Text cls="fs-14 commonGrey ff-sfSb">{title}</Text>}
            {!!shortContent && (
              <Text cls="mtn-8 ff-sfSb fs-14" numberOfLines={5}>
                {`${shortContent || ''}`}
              </Text>
            )}
          </View>
        </View>
        <View cls="flx-row mt3">
          <View cls="hg-24 wd-24">
            <Image
              cls="flx-i"
              source={images.commentMini}
              resizeMode="contain"
            />
          </View>
          <View cls="flx-i flx-row aic">
            <Text cls="ff-sfSb fs-12">Bình luận của bạn</Text>
            {!!createdAt && (
              <Text cls="ff-sfR fs-12 commonGrey mln-10">
                {moment(createdAt).fromNow()}
              </Text>
            )}
          </View>
        </View>

        <View cls="flx-row">
          <View cls="hg-24 wd-24" />
          <View cls="flx-i">
            <Text cls="ff-sfR fs-14">{content || ''}</Text>
          </View>
        </View>
      </DebounceTouch>
    );
  }

  function keyExtractor(item) {
    return `${item.id}`;
  }

  const renderItemSeparatorComponent = memo(wrap(() => <View cls="mtn-10" />));

  return (
    <View cls="flx-i mtn-10">
      <SingleOERFlatList
        data={comments}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmptyComponent}
        ItemSeparatorComponent={renderItemSeparatorComponent}
        renderItem={wrap(renderItem)}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        onEndReached={load}
        onRefresh={refresh}
      />
    </View>
  );
};

const ListCommentWrap = wrap(ListComment);

class PersonalComments extends React.PureComponent {
  static options() {
    return {
      topBar: {
        noBorder: true,
        visible: true
      }
    };
  }

  render() {
    return (
      <View cls="flx-i bg-settingBackground">
        <ListCommentWrap />
      </View>
    );
  }
}

export default wrap(PersonalComments);

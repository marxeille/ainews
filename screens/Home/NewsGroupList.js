import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wrap } from '@agiletechvn/react-theme';
import Bootstrap from 'AINews/src/App/Bootstrap';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { getGroups } from 'AINews/src/store/actions/posts';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';
import colors from 'AINews/src/themes/colors';
import images from 'AINews/assets/images';

import { trendingGroupItemHeight } from './RecycleNewsFeed/config';

const itemHeight = trendingGroupItemHeight;

type Props = {
  componentRef: {}
};

function NewsGroupList(props: Props) {
  const { componentRef } = props;

  const [groups, setGroups] = useState([
    {
      id: -1,
      name: 'Sự kiện hôm nay'
    }
  ]);
  const [height, setHeight] = useState(itemHeight + 10);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await callSagaRequest(getGroups);
      const { items } = result;
      if (items && items.length > 0) {
        setGroups(items);
      }
    } catch (err) {
      console.log('NewsGroupList/load error', err);
    }
  }

  function refreshList() {
    fetchData();
  }

  if (componentRef) {
    componentRef.current = {
      refreshList
    };
  }

  const onGroupPress = useCallback(({ name, image, numberPost }) => {
    Bootstrap.push({
      component: {
        name: 'GroupNewsFeed',
        options: {
          topBar: {
            title: {
              text: 'Tin tức toàn cảnh'
            },
            backButton: {
              icon: images.back,
              color: colors.commonGrey
            }
          }
        },
        passProps: {
          groupProps: {
            name,
            image,
            numberPost
          }
        }
      }
    });
  }, []);

  const renderItem = useCallback(
    wrap(({ item }) => {
      const { name, image, numberPost, id } = item;
      return (
        <TouchableOpacity
          cls="brs-4 oh"
          activeOpacity={0.8}
          onPress={() => {
            if (!id) {
              onGroupPress({
                name,
                image,
                numberPost
              });
            }
          }}
        >
          <ImageWithPlaceholder
            width={itemHeight * 0.7}
            cls="fullHeight"
            source={{ uri: image }}
          />
          <LinearGradient
            cls="absolute-fill jcfe phn-8 pbn-12"
            colors={[
              colors.brandAbsoluteBlack,
              colors.brandAbsoluteBlackPointFive
            ]}
          >
            <Text cls="brandWhite fs-14 ff-sfSb" numberOfLines={3}>
              {name}
            </Text>
            {numberPost ? (
              <Text cls="brandWhite fs-12 ff-sfR mt1" numberOfLines={2}>
                {`${numberPost} bài đăng`}
              </Text>
            ) : null}
          </LinearGradient>
        </TouchableOpacity>
      );
    }),
    []
  );

  const renderSeparator = useCallback(wrap(() => <View cls="wd-10" />), []);

  return (
    <View cls="fullWidth">
      <View cls="hg-8" />
      <View cls="pv2 pln-12 bg-brandWhite">
        <View cls="flx-row aic">
          <View cls="pr2">
            <Image
              cls="wd-24 hg-24"
              source={images.trending}
              resizeMode="contain"
            />
          </View>
          <Text cls="fs-16 ff-sfSb brandBlack">Theo dòng sự kiện</Text>
        </View>

        <View cls={`mt2 hg-${height} jcc`}>
          <FlatList
            contentContainerCls="prn-12"
            data={groups}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            horizontal
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      </View>
      <View cls="hg-8" />
    </View>
  );
}

export default wrap(NewsGroupList);

import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

import Bootstrap from 'AINews/src/App/Bootstrap';
import useRelatedPosts from 'AINews/src/hooks/useRelatedPosts';
import { fixAndroidBoldCls } from 'AINews/src/utils/trivia';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';

type Props = {
  postId: String
};

const RelatedPosts = (props: Props) => {
  const { postId } = props;

  const { posts, loading } = useRelatedPosts({
    postId
  });

  if (loading || posts.length === 0) {
    return <View />;
  }

  const onPostPress = post => {
    Bootstrap.push({
      component: {
        name: 'LinkedNewsDetails',
        passProps: {
          shouldLoadFullContent: post.displayType !== 0,
          id: post.id,
          autoShowKeyboard: true
        }
      }
    });
  };

  return (
    <View cls="ph3">
      <Text cls={fixAndroidBoldCls('fs-16 ff-sfSb mv3 lightGreyish')}>
        Bài viết liên quan
      </Text>
      <View cls="fullWidth">
        <View cls="bg-newsSeparatingLine hg-1 fullWidth" />
      </View>
      {posts.map((post, index) => (
        <TouchableOpacity
          key={index}
          cls="mt3 flx-row aic"
          onPress={() => onPostPress(post)}
        >
          <View>
            {post.featureImages
            && Array.isArray(post.featureImages)
            && post.featureImages.length > 0 ? (
              <View cls="pr3">
                <View cls="sz-50 br3 btw-1 bbw-1 blw-0 brw-0 b--empty oh">
                  <ImageWithPlaceholder
                    post
                    source={{ uri: post.featureImages[0] }}
                  />
                </View>
              </View>
              ) : null}
          </View>
          <View cls="flx-i">
            <Text cls={fixAndroidBoldCls('fs-16 ff-sfSb')} numberOfLines={3}>
              {`${post.title}`}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <View cls="fullWidth mt3">
        <View cls="bg-newsSeparatingLine hg-1 fullWidth" />
      </View>
    </View>
  );
};

export default memo(wrap(RelatedPosts), () => false);

import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { fixAndroidBoldCls } from 'AINews/src/utils/trivia';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';

type Props = {
  post: Object
};

const NewsDetailHeader = (props: Props) => {
  const { post } = props;

  if (!post) {
    return <View />;
  }

  return (
    <View cls="flx-i jcc aic bg-white">
      <View cls="flx-row aic jcc bg-white">
        <View>
          <View cls="squareFn-30 oh b--brandGrey bwh bg-white">
            <ImageWithPlaceholder
              source={{
                uri: post.author && post.author.avatar
              }}
              cls="fullView bg-white"
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          cls={`pl2 maxwd-${Dimensions.get('window').width * 0.7} bg-white`}
        >
          {post.author && post.author.fullName ? (
            <Text cls={fixAndroidBoldCls('ff-sfSb fs-14')} numberOfLines={1}>
              {post.author.fullName}
            </Text>
          ) : null}
          {post.title ? (
            <Text cls="ff-sfR fs-12 brandDarkGrey" numberOfLines={1}>
              {post.title}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default wrap(NewsDetailHeader);

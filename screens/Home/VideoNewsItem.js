import React from 'react';
import { View, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { wrap } from '@agiletechvn/react-theme';

const VIDEO_WIDTH = Dimensions.get('window').width;
const VIDEO_HEIGHT = (VIDEO_WIDTH * 234) / 414;

type Props = {
  video: String
};

const VideoNewsItem = (props: Props) => {
  const { video } = props;

  return (
    <View cls="bw-2">
      <Video source={{ uri: video }} cls={`wd-${VIDEO_WIDTH} hg-${VIDEO_HEIGHT}`} paused />
    </View>
  );
};

export default wrap(VideoNewsItem);

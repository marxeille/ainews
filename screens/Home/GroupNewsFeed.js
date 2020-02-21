import React from 'react';
import { View, Text, Image } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import NewsFeed from 'AINews/src/screens/Home/NewsFeed';
import images from 'AINews/assets/images';

type Props = {
  groupProps: {}
};

const GroupNewsFeed = wrap((props: Props) => {
  const { groupProps } = props;
  const { name } = groupProps;

  return (
    <View cls="flx-i">
      <View cls="flx-row aic pa3">
        <View cls="pr3">
          <Image
            cls="wd-24 hg-24"
            source={images.newsGroup}
            resizeMode="contain"
          />
        </View>
        <View cls="flx-i">
          <Text cls="ff-sfSb fs-16">{name}</Text>
        </View>
      </View>
      <View cls="hg-1 bg-empty" />
      <NewsFeed type="group" groupProps={groupProps} />
    </View>
  );
});

class GroupNewsFeedWrap extends React.Component {
  static options = () => ({});

  render() {
    return <GroupNewsFeed {...this.props} />;
  }
}

export default GroupNewsFeedWrap;

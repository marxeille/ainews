import React from 'react';
import { View } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

import PersonalProfileHeader from '../UserPersonal/PersonalProfileHeader';
import NewsFeed from '../Home/NewsFeed';

type Props = {
  componentId: String,
  author: Object,
  isTab: Boolean
};

const Personal = (props: Props) => {
  const { author } = props;

  const ProfileHeader = wrap(() => (
    <View cls="bg-white mbn-10 ptn-10">
      <PersonalProfileHeader me={{ author }} isAuthor />
    </View>
  ));

  return (
    <View cls="flx-i bg-white">
      <NewsFeed
        type="author"
        authorId={author.id}
        NewsFeedHeaderComponent={<ProfileHeader />}
        // scrollViewProps={{
        //   ListHeaderComponent: <ProfileHeader />
        // }}
      />
    </View>
  );
};
export default wrap(Personal);

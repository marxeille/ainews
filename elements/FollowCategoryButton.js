import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from '../components/common/DebounceTouch';
import { t } from '../utils/LocalizationUtils';


type Props = {
  following: boolean,
  callback: any
};

const FollowCategoryButton = (props: Props) => {
  const { following, callback } = props;
  return (
    <DebounceTouch onPress={callback} activeOpacity={0.7}>
      <View
        cls={`${
          following ? 'bg-white bw-2 b--white' : 'bg-transparent bw-2 b--white'
        } pvn-4 phn-12 aic jcc brs-14`}
      >
        <Text
          cls={`${
            following ? 'followButtonFollowed' : 'followButtonInfollowed'
          } fs-12 ff-sfB`}
        >
          {following ? t('common.following') : t('common.follow')}
        </Text>
      </View>
    </DebounceTouch>
  );
};

export default wrap(FollowCategoryButton);

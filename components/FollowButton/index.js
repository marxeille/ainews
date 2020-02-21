import React, { useContext } from 'react';
import NavigationContext from 'AINews/src/components/common/NavigationContext';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { followAuthor, unfollowAuthor } from 'AINews/src/store/actions/user';
import { t } from 'AINews/src/utils/LocalizationUtils';
import {
  showLoginRequiredAlert,
  showConfirmAlert
} from 'AINews/src/utils/trivia';

type Props = {
  id: String,
  containerCls?: String
};

const FollowButton = (props: Props) => {
  const { id, containerCls } = props;

  const token = useSelector(state => state.token.token);
  const author = useSelector(state => state.authors[id]);
  const { componentId } = useContext(NavigationContext);

  function onFollowPress() {
    if (!token) {
      showLoginRequiredAlert(componentId);
      return;
    }

    if (!author || !author.following) {
      callSagaRequest(followAuthor, { authorId: id });
      return;
    }

    showConfirmAlert(
      t('followButton.unfollowWarningTitle'),
      t('followButton.unfollowWarningDescription'),
      t('common.close'),
      t('followButton.unfollowWarningTitle'),
      () => callSagaRequest(unfollowAuthor, { authorId: id })
    );
  }

  if (!author) {
    return (
      <TouchableOpacity
        cls={['bg-reddish pvn-5 phn-15 aic jcc brs-4', containerCls]}
        onPress={onFollowPress}
        activeOpacity={0.7}
      >
        <Text cls="followButtonInfollowed fs-12 ff-sfB">
          {t('common.follow')}
        </Text>
      </TouchableOpacity>
    );
  }

  const { following } = author;

  return (
    <TouchableOpacity
      onPress={onFollowPress}
      activeOpacity={0.7}
      cls={[
        containerCls,
        `${
          following ? 'bg-white bw-1' : 'bg-reddish'
        } pvn-5 phn-10 aic jcc brs-3 b--categoryTitle`
      ]}
    >
      <Text
        cls={`${
          following ? 'followButtonFollowed' : 'followButtonInfollowed'
        } fs-12 ff-sfB`}
      >
        {following ? t('common.following') : t('common.follow')}
      </Text>
    </TouchableOpacity>
  );
};
FollowButton.defaultProps = {
  containerCls: ''
};

export default wrap(FollowButton);

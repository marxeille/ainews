import React, { useContext } from 'react';
import NavigationContext from 'AINews/src/components/common/NavigationContext';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import {
  followCategory,
  unfollowCategory
} from 'AINews/src/store/actions/user';
import {
  addCategoryLocally,
  removeCategoryLocally
} from 'AINews/src/store/actions/categories';
import { t } from 'AINews/src/utils/LocalizationUtils';
import {
  showLoginRequiredAlert,
  showConfirmAlert
} from 'AINews/src/utils/trivia';

type Props = {
  id: String,
  name: String,
  containerCls?: String
};

const FollowCategoryButton = (props: Props) => {
  const { id, name, containerCls } = props;

  const token = useSelector(state => state.token.token);
  const { categories } = useSelector(state => state.categories);
  const { componentId } = useContext(NavigationContext);

  const dispatch = useDispatch();

  function isCategorySelected() {
    return categories.find(category => category.id === id);
  }

  function onFollowPress() {
    if (!token) {
      showLoginRequiredAlert(componentId);
      return;
    }

    if (!isCategorySelected()) {
      dispatch(
        addCategoryLocally({
          id,
          name
        })
      );
      callSagaRequest(followCategory, { categoryId: id });
      return;
    }

    showConfirmAlert(
      t('followCategoryButton.unfollowWarningTitle'),
      t('followCategoryButton.unfollowWarningDescription'),
      t('common.close'),
      t('followCategoryButton.unfollowWarningTitle'),
      () => {
        dispatch(
          removeCategoryLocally({
            id
          })
        );
        callSagaRequest(unfollowCategory, { categoryId: id });
      }
    );
  }

  const _isCategorySelected = isCategorySelected();

  // if (!_isCategorySelected) {
  //   return (
  //     <TouchableOpacity
  //       cls={['bg-reddish pvn-5 phn-10 aic jcc brs-3', containerCls]}
  //       onPress={onFollowPress}
  //       activeOpacity={0.7}
  //     >
  //       <Text cls="followButtonInfollowed fs-12 ff-sfB">
  //         {t('common.follow')}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // }

  return (
    <TouchableOpacity
      onPress={onFollowPress}
      activeOpacity={0.7}
      cls={[
        containerCls,
        `${
          _isCategorySelected ? 'bg-transparent bw-1' : 'bg-brandWhite'
        } pvn-5 phn-10 aic jcc brs-3 b--brandWhite`
      ]}
    >
      <Text
        cls={`${
          _isCategorySelected
            ? 'followButtonFollowed brandWhite'
            : 'followButtonInfollowed brandBlack'
        } fs-12 ff-sfB`}
      >
        {_isCategorySelected ? t('common.following') : t('common.follow')}
      </Text>
    </TouchableOpacity>
  );
};
FollowCategoryButton.defaultProps = {
  containerCls: ''
};

export default wrap(FollowCategoryButton);

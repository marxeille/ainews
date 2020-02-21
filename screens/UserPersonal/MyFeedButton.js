import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'AINews/src/themes/colors';
import images from '../../../assets/images';
import Bootstrap from '../../App/Bootstrap';

const getMyFeedsString = categories => {
  if (!categories || (Array.isArray(categories) && categories.length < 2)) {
    return '';
  }

  const currentCategories = JSON.parse(JSON.stringify(categories));
  currentCategories.shift();

  const myFeedsCategories = currentCategories
    .filter(category => category.id !== 'dexuat')
    .map(category => category.name);

  if (myFeedsCategories.length === 1) {
    return myFeedsCategories[0];
  }

  if (myFeedsCategories.length === 2) {
    return `${myFeedsCategories[0]}, ${myFeedsCategories[1]}`;
  }
  return `${myFeedsCategories[0]}, ${
    myFeedsCategories[1]
  }, +${currentCategories.length - 2}`;
};

const MyFeed = () => {
  const categories = useSelector(state => state.categories.categories);
  const title = getMyFeedsString(categories);

  return (
    <DebounceTouch
      cls="bg-white flx-row jcc aic hg-60"
      onPress={() =>
        Bootstrap.push({
          component: {
            name: 'CategoryConfiguration',
            options: {
              topBar: {
                backButton: {
                  icon: images.back,
                  color: colors.commonGrey
                }
              }
            }
          }
        })
      }
    >
      <View cls="flx-i">
        <Text cls="ff-sfSb fs-14">{title}</Text>
      </View>
      <FontAwesome name="angle-right" size={24} cls="empty" />
    </DebounceTouch>
  );
};

const MyFeedButton = wrap(MyFeed);

export default MyFeedButton;

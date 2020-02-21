/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import { saveKeyword } from 'AINews/src/store/actions/search';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import Bootstrap from '../../App/Bootstrap';


const Suggestion = ({ item }) => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(saveKeyword({ keyword: item }));
    Bootstrap.push({
      component: {
        name: 'HomeSearch',
        passProps: {
          searchKey: item
        }
      }
    })
  }

  return (
    <DebounceTouch
      cls="mh3 pv2 bwh btw-0 blw-0 brw-0 b--empty"
      onPress={onPress}
    >
      <Text cls="ff-sf">{item}</Text>
    </DebounceTouch>
  );
}

const SuggestionItem = wrap(Suggestion);

export default SuggestionItem;

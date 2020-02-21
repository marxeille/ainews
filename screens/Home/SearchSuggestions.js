/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, Text } from 'react-native';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import { wrap } from '@agiletechvn/react-theme';
import { saveKeyword } from 'AINews/src/store/actions/search';
import Bootstrap from '../../App/Bootstrap';
import SuggestionItem from './SuggestionItem';

const ListFooterComponent = () => {
  const key = useSelector(state => state.searchReducer.key);
  const dispatch = useDispatch();

  const pushToSearch = () => {
    dispatch(saveKeyword({ keyword: key }));
    Bootstrap.push({
      component: {
        name: 'HomeSearch',
        passProps: {
          searchKey: key
        }
      }
    });
  };

  if (!key) {
    return null;
  }
  return (
    <View>
      <DebounceTouch cls="mh3 pv2" onPress={pushToSearch}>
        <Text cls="blue ff-sf">
          Xem kết quả cho:
          {' '}
          <Text cls="ff-sf fw6">{key}</Text>
        </Text>
      </DebounceTouch>
    </View>
  );
};

const Suggestions = () => {
  const items = useSelector(state => state.searchReducer.items);
  const isSuggesting = useSelector(state => state.searchReducer.isSuggesting);
  const savedKeywords = useSelector(state => state.searchReducer.savedKeyword);
  const key = useSelector(state => state.searchReducer.key);
  if (!key) {
    return (
      <FlatList
        data={savedKeywords}
        keyExtractor={(item, index) => `${item}${index}`}
        renderItem={({ item }) => <SuggestionItem item={item} />}
        keyboardShouldPersistTaps="handled"
      />
    );
  }
  return (
    <FlatList
      refreshing={isSuggesting}
      data={items}
      keyExtractor={(item, index) => `${item}${index}`}
      renderItem={({ item }) => <SuggestionItem item={item} />}
      ListFooterComponent={wrap(ListFooterComponent)}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const SearchSuggestions = wrap(Suggestions);

export default SearchSuggestions;

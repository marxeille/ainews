import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
// import { WINDOW_WIDTH } from 'AINews/src/utils/trivia';
import AuthorSuggestionItem from 'AINews/src/screens/Home/AuthorSuggestionList/AuthorSuggestionItem';
import { t } from 'AINews/src/utils/LocalizationUtils';

type Props = {
  items: [
    {
      id: String,
      avatar: String,
      fullName: String,
      numberFollow: Number
    }
  ]
};

const AuthorSuggestionList = (props: Props) => {
  const { items } = props;

  function renderItem({ item }) {
    return <AuthorSuggestionItem {...item} />;
  }

  // function getItemLayout(data: any, index: number) {
  //   return { length: WINDOW_WIDTH, offset: WINDOW_WIDTH * index, index };
  // }

  function renderItemSepartorComponent() {
    return <View cls="wd-8" />;
  }

  return (
    <View cls="pvn-12 bg-brandWhite">
      <View cls="phn-12">
        <Text cls="fs-17 ff-sfB brandBlack">
          {t('authorSuggestion.outstandingAuthor')}
        </Text>
        <View cls="hg-10" />
      </View>
      <FlatList
        contentContainerCls="phn-12"
        ItemSeparatorComponent={wrap(renderItemSepartorComponent)}
        cls="bg-white"
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={renderItem}
        // getItemLayout={getItemLayout}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

export default wrap(AuthorSuggestionList);

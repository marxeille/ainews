/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';

import { saveCategories } from 'AINews/src/store/actions/categories';

import CategoryPickUp from '../Home/CategoryPickUp';
import useSuggestions from '../../hooks/useSuggestions';
import FooterButton from '../../elements/FooterButton';
import Bootstrap from '../../App/Bootstrap';
import { getScaledSize } from '../../utils/trivia';
import { t } from '../../utils/LocalizationUtils';
import { callSagaRequest } from '../../utils/RequestHandler';
import { loginAnonymously } from '../../store/actions/auth';

function CategoriesSelect() {
  const [suggestions, loadingSuggestions] = useSuggestions();
  const [chosen, setChosen] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        await callSagaRequest(loginAnonymously);
      } catch (err) {
        console.log('CategoriesSelect/loginAnonymously error', err);
      }
    })();
  }, []);

  function renderHeader() {
    return (
      <View cls="ptn-40">
        <Text cls="categorySelectTitle fs-28 tc ff-sf">
          {t('selectCategories.title')}
        </Text>
        <View cls="hg-11" />
        <Text cls="categorySelectTitle fs-14 tc pbn-96 ff-sf">
          {t('selectCategories.subtitle')}
        </Text>
      </View>
    );
  }

  async function onGoToNewsFeedPress() {
    const selectedCategories = chosen.map(item => ({
      id: item.id,
      name: item.name
    }));

    // const followCategoryIds = chosen.map(item => item.id);

    dispatch(
      saveCategories([{ id: 'dexuat', name: 'Đề xuất' }, ...selectedCategories])
    );
    Bootstrap.startApp();
  }

  function renderFooter() {
    return (
      <View cls="pvn-40 flx-i">
        <FooterButton
          label={t('selectCategories.goToNewsFeed')}
          active={chosen.length > 0}
          callback={onGoToNewsFeedPress}
        />
      </View>
    );
  }

  function renderCategory({ item }) {
    const { name, image, color } = item;
    const following = chosen.find(i => i.id === item.id);

    return (
      <View cls={`phn-${getScaledSize(10)}`}>
        <CategoryPickUp
          height={getScaledSize(110)}
          width={getScaledSize(150)}
          title={name}
          following={following}
          image={image}
          backgroundColor={color}
          callback={() => onSelectCategory(item)}
        />
      </View>
    );
  }

  const onSelectCategory = item => {
    const isItemSelected = chosen.find(i => item.id === i.id);
    if (isItemSelected) {
      const removeItem = [...chosen.filter(i => item.id !== i.id)];
      setChosen(removeItem);
    } else {
      const addItem = [...chosen, { ...item, chosen: true }];
      setChosen(addItem);
    }
  };

  function renderLoading() {
    return (
      <View>
        <Text cls="loading ff-sfB">{t('selectCategories.loadingTopics')}</Text>
        <View cls="hg-10" />
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View cls="flx-i bg-black ph2">
      <FlatList
        contentContainerStyle={{ alignItems: 'center' }}
        data={suggestions}
        ListHeaderComponent={wrap(renderHeader)}
        ItemSeparatorComponent={wrap(() => (
          <View cls={`hg-${getScaledSize(20)}`} />
        ))}
        renderItem={wrap(renderCategory)}
        keyExtractor={item => item.id}
        numColumns={2}
        ListFooterComponent={wrap(renderFooter)}
        ListEmptyComponent={loadingSuggestions ? wrap(renderLoading)() : null}
      />
    </View>
  );
}

export default wrap(CategoriesSelect);

import React, { useRef } from 'react';
import { View } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import CategorySelector from 'AINews/src/elements/CategorySelector';
import InteractableTabView from 'AINews/src/components/common/InteractableTabView';
import SavedPosts from 'AINews/src/screens/SavedPosts';
import { t } from '../../../../utils/LocalizationUtils';

import AboutTab from './AboutTab';

type Props = {
  renderMainScrollView: Function,
  author: Object,
  profile: Object,
  isTab: Boolean
};

function ParallaxTabBar(props: Props) {
  const {
    renderMainScrollView, author, profile, isTab
  } = props;
  const categorySelectorRef = useRef();

  let categories = [];

  if (isTab || (author && author.id === profile.id)) {
    categories = [
      { name: t('personal.posts'), id: 1 },
      { name: t('personal.comments'), id: 2 },
      { name: t('personal.save'), id: 3 },
      { name: t('personal.about'), id: 4 }
    ];
  } else {
    categories = [
      { name: t('personal.posts'), id: 1 },
      { name: t('personal.about'), id: 4 }
    ];
  }

  const renderTabs = wrap(() => categories.map(({ id }) => {
    switch (id) {
      case 1:
        return (
          <View key={id} cls="flx-i">
            {renderMainScrollView()}
          </View>
        );
      case 3:
        return <View key={id} cls="flx-i"><SavedPosts /></View>
      case 4:
        return <AboutTab key={id} profile={profile} author={author} />;
      default:
        return <View key={id} />;
    }
  }));

  function renderTabBar(tabBarProps) {
    return (
      <View>
        <CategorySelector
          {...tabBarProps}
          componentRef={categorySelectorRef}
          categories={categories}
        />
        <View cls="hg-10" />
      </View>
    );
  }

  function onDrag() {
    if (categorySelectorRef.current) {
      categorySelectorRef.current.refocus();
    }
  }

  return (
    <View cls="flx-i">
      <InteractableTabView
        renderTabBar={wrap(renderTabBar)}
        scrollWithoutAnimation
        onDrag={onDrag}
      >
        {renderTabs()}
      </InteractableTabView>
    </View>
  );
}

export default wrap(ParallaxTabBar);

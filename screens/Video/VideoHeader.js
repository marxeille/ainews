import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import CategorySelector from '../../elements/CategorySelector';

type Props = {};

const VideoHeader = (props: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function onCategorySelect(index) {
    setSelectedIndex(index);
  }

  return (
    <View cls="flx-row pv2">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CategorySelector
          categories={['Suggest', 'Entertainment', 'Funny', 'Sport']}
          onSelect={onCategorySelect}
          selectedIndex={selectedIndex}
          containerCls=""
          buttonContainerCls="ph2"
          buttonTextCls="categoryTitle"
          buttonContainerActiveCls="ph2"
          buttonTextActiveCls="categoryTitleSelected fw6"
        />
      </ScrollView>
    </View>
  );
};

export default wrap(VideoHeader);

import React from 'react';
import { View } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';

type Props = {
  image
};

const SaveItem = (props: Props) => {
  const { componentId } = props;
  return (
    <View cls="flx-row">
      <ImageWithPlaceholder width={200} height={150} />
    </View>
  )
}

export default wrap(SaveItem)

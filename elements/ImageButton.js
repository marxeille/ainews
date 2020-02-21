/**
 * @flow
 */

import React from 'react';
import {
  Image,
  ImageRequireSource,
  StyleProp
} from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from '../components/common/DebounceTouch';

type Props = {
  width: number,
  height: number,
  image: ImageRequireSource,
  callback: () => void,
  hitSlop?: {},
  containerStyle: StyleProp
};

const ImageButton = wrap((props: Props) => {
  const {
    width, height, image, callback, hitSlop, containerStyle
  } = props;
  return (
    <DebounceTouch
      cls={[containerStyle]}
      // style={[containerStyle]}
      activeOpacity={0.5}
      onPress={callback}
      hitSlop={hitSlop}
    >
      <Image
        source={image}
        cls={`wd-${width} hg-${height}`}
        resizeMode="contain"
      />
    </DebounceTouch>
  );
});

ImageButton.defaultProps = {
  hitSlop: {}
};

export default ImageButton;

/**
 * @flow
 */

import type { ImageRequireSource } from 'react-native';
import { View, Image } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import { wrap } from '@agiletechvn/react-theme';

type Props = {
  width?: number,
  height?: number,
  brs?: number,
  cls?: string,
  source?: {},
  defaultImage?: ImageRequireSource,
  resizeMode?: String
};

const ImageWithPlaceHolder = (props: Props) => {
  const {
    width,
    height,
    brs,
    source,
    cls,
    defaultImage,
    resizeMode,
    ...rest
  } = props;

  const imageClass = `${width ? `wd-${width}` : ''} ${
    height ? `hg-${height}` : ''
  } ${brs ? `brs-${brs}` : ''} bg-empty oh ${cls || ''}`;

  let resizeModeFastImage = null;

  switch (resizeMode) {
    case 'cover':
      resizeModeFastImage = FastImage.resizeMode.cover;
      break;
    case 'contain':
      resizeModeFastImage = FastImage.resizeMode.contain;
      break;
    case 'stretch':
      resizeModeFastImage = FastImage.resizeMode.stretch;
      break;
    case 'center':
      resizeModeFastImage = FastImage.resizeMode.center;
      break;

    default:
      resizeModeFastImage = FastImage.resizeMode.cover;
      break;
  }

  if (source && source.uri) {
    return (
      <View cls={imageClass} {...rest}>
        <FastImage
          source={source}
          cls="fullView"
          resizeMode={resizeModeFastImage}
          {...rest}
        />
      </View>
    );
  }

  if (defaultImage) {
    return (
      <View cls={imageClass}>
        <Image
          source={defaultImage}
          cls="fullView"
          resizeMode={resizeMode}
          {...rest}
        />
      </View>
    );
  }

  return <View cls={imageClass} {...rest} />;
};

ImageWithPlaceHolder.defaultProps = {
  width: 0,
  height: 0,
  brs: 0,
  cls: '',
  source: {},
  defaultImage: null,
  resizeMode: 'cover'
};

export default wrap(ImageWithPlaceHolder, 'defaultProps');

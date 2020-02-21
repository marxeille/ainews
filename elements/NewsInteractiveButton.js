import type { ImageRequireSource } from 'react-native';

import React from 'react';
import { View, Text, Image } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { isAndroid, fixAndroidBoldCls } from '../utils/trivia';
import DebounceTouch from '../components/common/DebounceTouch';

type Props = {
  value: number,
  image: ImageRequireSource,
  callback: any,
  rightButton?: {},
  isSmallSize?: boolean
};

const NewsInteractiveButton = (props: Props) => {
  const { value, image, callback, rightButton, isSmallSize } = props;

  function renderWithoutRightButton() {
    return (
      <DebounceTouch
        hitSlop={{
          top: 15,
          left: 15,
          bottom: 15,
          right: 15
        }}
        activeOpacity={0.6}
        onPress={callback}
      >
        <View cls="flx-row aic">
          {image ? (
            <View cls="flx-row aic">
              <Image cls="wd-24 hg-24" source={image} resizeMode="contain" />
              {value || value === 0 ? <View cls="wd-9" /> : null}
            </View>
          ) : null}

          <Text
            cls={fixAndroidBoldCls(
              `${isSmallSize ? 'fs-13' : 'fs-15'} interactiveNumber ff-sfSb`
            )}
          >
            {value}
          </Text>
        </View>
      </DebounceTouch>
    );
  }

  function renderWithRightButton() {
    return (
      <View cls="flx-row aic">
        <DebounceTouch
          hitSlop={{
            top: 15,
            left: 15,
            bottom: 15,
            right: 15
          }}
          activeOpacity={0.6}
          onPress={callback}
        >
          <Image cls="wd-24 hg-24" source={image} resizeMode="contain" />
        </DebounceTouch>
        <View cls="wd-9" />
        <Text
          cls={fixAndroidBoldCls(
            `${isSmallSize ? 'fs-13' : 'fs-15'} interactiveNumber ff-sfSb`
          )}
        >
          {value}
        </Text>
        <View cls="flx-row aic">
          <View cls="wd-9" />
          <DebounceTouch
            hitSlop={{
              top: 15,
              left: 15,
              bottom: 15,
              right: 15
            }}
            activeOpacity={0.6}
            onPress={rightButton.callback}
          >
            <Image
              cls="wd-24 hg-24"
              source={rightButton.image}
              resizeMode="contain"
            />
          </DebounceTouch>
        </View>
      </View>
    );
  }

  if (rightButton) {
    return renderWithRightButton();
  }

  return renderWithoutRightButton();
};

NewsInteractiveButton.defaultProps = {
  rightButton: null,
  isSmallSize: false
};

export default wrap(NewsInteractiveButton, 'defaultProps');

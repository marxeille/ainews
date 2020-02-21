import React, { useEffect, useState, useRef, memo } from 'react';
import { Animated, View, PanResponder } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import TextButton from 'AINews/src/elements/TextButton';
import AnimatedTextButton from './AnimatedTextButton';
import { fixAndroidBoldCls, WINDOW_WIDTH } from '../utils/trivia';

type Props = {
  componentRef: React.Ref,
  categories: [],
  goToPage: number => void,
  activeTab: number,
  scrollValue: Animated.Value,
  containerWidth: number,
  viewableWidth: number,
  centerize?: boolean
};

const CategorySelector = (props: Props) => {
  const {
    componentRef,
    categories,
    goToPage,
    scrollValue,
    containerWidth,
    viewableWidth,
    centerize
  } = props;

  const _viewableWidth = useRef(viewableWidth);
  const _containerWidth = useRef(containerWidth);

  const calculated = useRef(false);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);

  const panX = useRef(new Animated.Value(0));

  const previousCategories = useRef();

  const [panResponder] = useState(
    PanResponder.create({
      // onStartShouldSetPanResponder: () => true,
      // onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: (e, ges) => ges.dx > 5 || ges.dx < -5,
      onPanResponderGrant: () => {
        panX.current.extractOffset();
      },
      onPanResponderRelease: () => {
        panX.current.flattenOffset();
      },
      onPanResponderMove: Animated.event([null, { dx: panX.current }])
    })
  );

  const scrollPositionInputRange = useRef(
    Array(categories.length)
      .fill()
      .map((e, i) => -(categories.length - i - 1) * containerWidth)
  );

  const [widths, setWidths] = useState(Array(categories.length).fill(0));
  const scrollPositionOutputRange = useRef(Array(categories.length).fill(0));
  const indicatorPositionOutputRange = useRef(Array(categories.length).fill(0));
  const indicatorScaleOutputRange = useRef(Array(categories.length).fill(0));

  useEffect(() => {
    calculated.current = false;

    if (previousCategories.current) {
      const allKeys = Object.keys({
        ...previousCategories.current,
        ...categories
      });

      let deletedCount = 0;

      allKeys.forEach((key, index) => {
        if (
          JSON.stringify(previousCategories.current[key])
          !== JSON.stringify(categories[key])
        ) {
          if (categories[key] === undefined) {
            const adjustedIndex = index - deletedCount;
            setWidths(ws => {
              const newWs = [
                ...ws.slice(0, adjustedIndex),
                ...ws.slice(adjustedIndex + 1)
              ];
              return newWs;
            });
            deletedCount += 1;
          } else {
            setWidths(ws => {
              const newWs = [...ws.slice(0, index), 0, ...ws.slice(index + 1)];
              return newWs;
            });
          }
        }
      });
    }
    previousCategories.current = categories;

    scrollPositionInputRange.current = Array(categories.length)
      .fill()
      .map((e, i) => -(categories.length - i - 1) * _containerWidth.current);

    scrollPositionOutputRange.current = Array(categories.length).fill(0);
    indicatorPositionOutputRange.current = Array(categories.length).fill(0);
    indicatorScaleOutputRange.current = Array(categories.length).fill(0);
  }, [categories]);

  useEffect(() => {
    if (calculated.current || widths.includes(0)) {
      return;
    }

    calculated.current = true;

    const distances = widths.reduce(
      (acc, cur) => [...acc, acc[acc.length - 1] + cur],
      [0]
    );

    const _scrollViewWidth = distances[distances.length - 1];
    setScrollViewWidth(_scrollViewWidth);
    scrollPositionOutputRange.current = distances
      .slice(0, distances.length - 1)
      .map((e, index) => Math.max(
        0,
        Math.min(
          e - _viewableWidth.current / 2 + widths[index] / 2,
          _scrollViewWidth - _viewableWidth.current
        )
      ))
      .reverse();

    indicatorPositionOutputRange.current = distances
      .slice(0, distances.length - 1)
      .map((e, index) => Math.max(0, Math.min(e + widths[index] / 2)))
      .reverse();

    indicatorScaleOutputRange.current = widths.map(e => e - 24).reverse();
  }, [widths]);

  if (componentRef) {
    componentRef.current = {
      refocus
    };
  }

  function refocus() {
    panX.current.setValue(0);
    panX.current.setOffset(0);
  }

  function _calculateButtonStyle(index) {
    const originalInputRange = Array(categories.length)
      .fill()
      .map((e, i) => -(categories.length - i - 1) * _containerWidth.current);

    if (!calculated.current) {
      return null;
    }

    const realInputIndex = categories.length - index - 1;

    const _inputRange = [originalInputRange[realInputIndex]];
    const _outputRange = [1.0];

    if (realInputIndex > 0) {
      _inputRange.unshift(originalInputRange[realInputIndex - 1]);
      _outputRange.unshift(0.5);
    }

    if (realInputIndex < categories.length - 1) {
      _inputRange.push(originalInputRange[realInputIndex + 1]);
      _outputRange.push(0.5);
    }

    return {
      opacity: scrollValue.interpolate({
        inputRange: _inputRange,
        outputRange: _outputRange,
        extrapolate: 'clamp'
      })
    };
  }

  function _renderCategories() {
    if (categories.length < 2) {
      return (
        <TextButton
          containerCls="phn-12 pvn-8"
          textCls={fixAndroidBoldCls('fs-17 categoryTitleSelected ff-sfB')}
          label={categories[0].name}
        />
      );
    }

    return (
      <View cls="flx-row">
        {categories.map((category, index) => (
          <View
            cls={`${centerize ? 'flx-i aic' : ''}`}
            key={index}
            onLayout={({
              nativeEvent: {
                layout: { width }
              }
            }) => {
              setWidths(ws => [
                ...ws.slice(0, index),
                width,
                ...ws.slice(index + 1)
              ]);
            }}
          >
            <AnimatedTextButton
              containerCls="phn-12 pvn-8"
              textCls={fixAndroidBoldCls('fs-17 categoryTitleSelected ff-sfB')}
              label={category.name}
              callback={() => {
                refocus();
                goToPage(index);
              }}
              textStyle={_calculateButtonStyle(index)}
            />
          </View>
        ))}
      </View>
    );
  }

  if (!panResponder) {
    return null;
  }

  if (scrollPositionInputRange.current.length < 2) {
    return _renderCategories();
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        scrollViewWidth && scrollViewWidth > _viewableWidth.current
          ? [
            {
              transform: [
                {
                  translateX: Animated.add(
                    Animated.multiply(
                      scrollValue.interpolate({
                        inputRange: scrollPositionInputRange.current,
                        outputRange: scrollPositionOutputRange.current,
                        extrapolate: 'clamp'
                      }),
                      new Animated.Value(-1)
                    ),
                    panX.current
                  ).interpolate({
                    inputRange: [
                      -scrollViewWidth + _viewableWidth.current,
                      0
                    ],
                    outputRange: [
                      -scrollViewWidth + _viewableWidth.current,
                      0
                    ],
                    extrapolate: 'clamp'
                  })
                }
              ]
            },
            scrollViewWidth ? { width: scrollViewWidth } : null
          ]
          : null
      ]}
    >
      {_renderCategories()}
      <Animated.View
        cls={`wd-1 hg-4 bg-reddish ${centerize ? 'aic' : ''}`}
        style={[
          {
            transform: [
              {
                translateX: scrollValue.interpolate({
                  inputRange: scrollPositionInputRange.current,
                  outputRange: indicatorPositionOutputRange.current,
                  extrapolate: 'clamp'
                })
              },
              {
                scaleX: scrollValue.interpolate({
                  inputRange: scrollPositionInputRange.current,
                  outputRange: indicatorScaleOutputRange.current
                })
              }
            ]
          }
        ]}
      />
    </Animated.View>
  );
};
CategorySelector.defaultProps = {
  centerize: false
};

export default memo(wrap(CategorySelector, 'defaultProps'));

import React, { useRef, useState, useCallback } from 'react';
import { View, Image, Animated, Text, Keyboard } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { WINDOW_WIDTH, fixAndroidBoldCls } from 'AINews/src/utils/trivia';
import { DEVICE_WIDTH } from 'AINews/src/themes/config-theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';

import Bootstrap from '../../App/Bootstrap';
import NewsFeed from './RecycleNewsFeed';
import images from '../../../assets/images';
import ImageButton from '../../elements/ImageButton';
import CategorySelector from '../../elements/CategorySelector';
import InteractableTabView from '../../components/common/InteractableTabView';
import SearchInput from './SearchInput';
import SearchSuggestions from './SearchSuggestions';
import PreFetch from './PreFetch';

type Props = {
  categories: Array
};

function HomeHeader(props: Props) {
  let headerContainerLayout = { width: 0, height: 0 };

  const toggle = useRef(false);
  const searchInputRef = useRef();
  const searchInputComponentRef = useRef();

  const [logoAnimateValue] = useState(new Animated.Value(1));
  const [searchButtonValue] = useState(new Animated.Value(36));
  const [searchIconValue] = useState(new Animated.Value(0));
  const [searchIconOpacityValue] = useState(new Animated.Value(0));
  const [logoWidthValue] = useState(new Animated.Value(120));
  const [textInputAnimatedValue] = useState(new Animated.Value(0));
  const [textInputPaddingValue] = useState(new Animated.Value(0));
  const [textInputBorderValue] = useState(new Animated.Value(0));

  const [feedWidthValue] = useState(new Animated.Value(DEVICE_WIDTH));
  const [searchWidthValue] = useState(new Animated.Value(0));

  const onSearchPress = () => {
    const nextTextInputPaddingValue = {
      toValue: textInputPaddingValue._value === 0 ? 8 : 0,
      duration: 250
    };

    const nextTextInputBorderValue = {
      toValue: textInputBorderValue._value === 0 ? 18 : 0,
      duration: 250
    };

    const nextSearchButtonValue = {
      toValue: searchButtonValue._value === 0 ? 36 : 0,
      duration: 250
    };

    const nextSearchIconValue = {
      toValue: searchIconValue._value === 0 ? 24 : 0,
      duration: 250
    };

    const nextSearchIconOpacityValue = {
      toValue: searchIconOpacityValue._value === 0 ? 1 : 0,
      duration: 250
    };

    const nextLogoWidthValue = {
      toValue: logoWidthValue._value === 0 ? 107 : 0,
      duration: 250
    };

    const nextLogoAnimatedValue = {
      toValue: logoAnimateValue._value === 0 ? 1 : 0,
      duration: 250
    };

    const nextTextInputAnimatedValue = {
      toValue:
        textInputAnimatedValue._value === 0
          ? headerContainerLayout.width - 32
          : 0,
      duration: 250
    };

    const nextSearchWidthValue = {
      toValue: searchWidthValue._value === 0 ? DEVICE_WIDTH : 0,
      duration: 250
    };

    const nextFeedWidthValue = {
      toValue: feedWidthValue._value === 0 ? DEVICE_WIDTH : 0,
      duration: 250
    };

    const headerAnimation = Animated.parallel([
      Animated.timing(logoAnimateValue, nextLogoAnimatedValue),
      Animated.timing(searchButtonValue, nextSearchButtonValue),
      Animated.timing(logoWidthValue, nextLogoWidthValue),
      Animated.timing(feedWidthValue, nextFeedWidthValue),
      Animated.timing(searchWidthValue, nextSearchWidthValue)
    ]);

    const searchHeaderAnimation = Animated.parallel([
      Animated.timing(searchIconValue, nextSearchIconValue),
      Animated.timing(searchIconOpacityValue, nextSearchIconOpacityValue),
      Animated.timing(textInputAnimatedValue, nextTextInputAnimatedValue),
      Animated.timing(textInputBorderValue, nextTextInputBorderValue),
      Animated.timing(textInputPaddingValue, nextTextInputPaddingValue)
    ]);

    if (!toggle) {
      //toggle animation
      Animated.stagger(250, [headerAnimation, searchHeaderAnimation]).start();
    } else {
      // untoggle animation
      searchInputComponentRef.current
        && searchInputComponentRef.current.clearInput();
      Keyboard.dismiss();

      Animated.stagger(250, [searchHeaderAnimation, headerAnimation]).start(
        () => {
          if (toggle.current && searchInputRef.current) {
            searchInputRef.current.focus();
          }
        }
      );
    }

    // toggle state
    toggle.current = !toggle.current;
    // setToggle(!toggle)
  };

  const { categories } = props;
  const categorySelectorRef = useRef();

  const renderTabs = useCallback(
    () => categories
      && categories.length > 0
      && categories.map(({ id }) => (
        <NewsFeed
          type={id === 'dexuat' ? 'categoryWithGroup' : 'category'}
          key={id}
          category={{ id }}
          shouldNavigateToNewsDetailsList
        />
      )),
    [categories]
  );

  function onPlusPress() {
    Bootstrap.push({
      component: {
        name: 'CategoryConfiguration'
      }
    });
  }

  function renderTabBar(tabBarProps) {
    return (
      <View cls="bg-white">
        <View cls="flx-row">
          <View cls="flx-i">
            <CategorySelector
              viewableWidth={WINDOW_WIDTH - 44}
              {...tabBarProps}
              componentRef={categorySelectorRef}
              categories={categories}
            />
          </View>
          <View cls={`wd-${44} aic jcc bg-white pbn-4`}>
            <ImageButton
              callback={onPlusPress}
              width={20}
              height={20}
              image={images.plus}
              hitSlop={{
                top: 12,
                left: 12,
                bottom: 12,
                right: 12
              }}
            />
          </View>
        </View>
        <View cls="hg-1 bg-empty" />
      </View>
    );
  }

  function onDrag() {
    if (categorySelectorRef.current) {
      categorySelectorRef.current.refocus();
    }
  }

  return (
    <View cls="flx-i psbh">
      <View
        cls="flx-row ph3 hg-48 aic bg-white"
        onLayout={({ nativeEvent: { layout } }) => {
          headerContainerLayout = layout;
        }}
      >
        <Animated.View
          style={{ opacity: logoAnimateValue, width: logoWidthValue }}
          cls="flx-row aife"
        >
          <Image source={images.miniLogo} cls="wd-25 hg-25 rm-contain" />
          <Text cls={fixAndroidBoldCls('ff-sfSb fs-18 ml2')}>Bảng Tin</Text>
        </Animated.View>
        <Animated.View cls="flx-i flx-row-reverse aic">
          <Animated.View
            style={{ opacity: logoAnimateValue, width: searchButtonValue }}
          >
            <DebounceTouch
              cls="circleFn-32 bg-paleGray jcc aic"
              onPress={onSearchPress}
            >
              <Ionicons name="ios-search" cls="grey" size={24} />
            </DebounceTouch>
          </Animated.View>
          <Animated.View
            cls="flx-row aic"
            style={{
              width: textInputAnimatedValue
            }}
          >
            <Animated.View
              cls="flx-i bg-paleGray hg-36 mr2"
              style={{
                borderRadius: textInputBorderValue,
                paddingHorizontal: textInputPaddingValue
              }}
            >
              <SearchInput
                searchIconOpacityValue={searchIconOpacityValue}
                searchIconValue={searchIconValue}
                cls="flx-i"
                placeholder="Tìm kiếm..."
                underlineColorAndroid="transparent"
                autoCorrect={false}
                autoCapitalize="none"
                inputRef={searchInputRef}
                componentRef={searchInputComponentRef}
              />
            </Animated.View>
            <Text onPress={onSearchPress} cls="fs-14 blue mr2">
              Huỷ
            </Text>
          </Animated.View>
        </Animated.View>
      </View>
      <View cls="flx-i flx-row">
        <Animated.View
          style={{ width: feedWidthValue, opacity: logoAnimateValue }}
        >
          <InteractableTabView
            renderTabBar={wrap(renderTabBar)}
            // scrollWithoutAnimation
            onDrag={onDrag}
          >
            {renderTabs()}
          </InteractableTabView>
        </Animated.View>
        <Animated.View style={{ width: searchWidthValue }}>
          <SearchSuggestions />
        </Animated.View>
      </View>
      <PreFetch />
    </View>
  );
}

export default compose(
  connect(state => ({
    categories: state.categories.categories
  })),
  wrap
)(HomeHeader);

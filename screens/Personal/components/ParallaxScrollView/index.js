import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Animated, View, Platform
} from 'react-native';

import { getStatusBarHeight } from 'AINews/src/utils/statusBar';
import NewsFeed from 'AINews/src/screens/Home/NewsFeed';

import RNParallaxHeader from './Header';
import ParallaxTabBar from './ParallaxTabBar';

const STATUS_BAR_HEIGHT = getStatusBarHeight(true);
const NAV_BAR_HEIGHT = 64;

const ANIMATED_VALUE = 200;
const ANIMATED_DURATION = 200;

const SCROLL_EVENT_THROTTLE = 16;
const DEFAULT_HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT;
const DEFAULT_EXTRA_SCROLL_HEIGHT = 30;
const DEFAULT_BACKGROUND_IMAGE_SCALE = 1.5;

const DEFAULT_NAVBAR_COLOR = '#3498db';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: DEFAULT_NAVBAR_COLOR,
    overflow: 'hidden'
  },
  backgroundImage: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // height: DEFAULT_HEADER_MAX_HEIGHT,
    width: '100%',
    resizeMode: 'cover'
  },
  bar: {
    backgroundColor: 'transparent',
    height: DEFAULT_HEADER_MIN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});

type Props = {
  renderNavBar?: Function,
  renderStickyNavBar: Function,
  renderBackgroundHeader: Function,
  headerMinHeight?: Number,
  scrollEventThrottle?: Number,
  extraScrollHeight?: Number,
  backgroundImageScale?: Number,
  innerContainerStyle?: any,
  containerStyle?: any,
  alwaysShowNavBar?: Boolean,
  profile: Object,
  token: String,
  navbarColor?: String,
  statusBarColor?: String,
  author: Object,
  isTab: Boolean
};

class ParallaxScrollView extends Component<Props> {
  constructor() {
    super();

    this.state = {
      headerHeight: 0
    };

    this.backgroundImageHeaderHeight = 0;
    this.header = React.createRef();

    this.scrollY = new Animated.Value(0);
  }

  getHeaderMaxHeight() {
    const { headerHeight } = this.state;
    return headerHeight;
  }

  getHeaderMinHeight() {
    const { headerMinHeight } = this.props;
    return headerMinHeight;
  }

  getHeaderScrollDistance() {
    if (this.getHeaderMaxHeight() === 0) {
      return 0;
    }
    return this.getHeaderMaxHeight() - this.getHeaderMinHeight();
  }

  getExtraScrollHeight() {
    const { extraScrollHeight } = this.props;
    return extraScrollHeight;
  }

  getBackgroundImageScale() {
    const { backgroundImageScale } = this.props;
    return backgroundImageScale;
  }

  getInputRange() {
    return [-this.getExtraScrollHeight(), 0, this.getHeaderScrollDistance()];
  }

  getHeaderHeight() {
    return this.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [
        this.getHeaderMaxHeight() + this.getExtraScrollHeight(),
        this.getHeaderMaxHeight(),
        this.getHeaderMinHeight()
      ],
      extrapolate: 'clamp'
    });
  }

  getTabBarHeaderHeight() {
    return this.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [
        this.getHeaderMaxHeight()
          + this.getExtraScrollHeight()
          - STATUS_BAR_HEIGHT,
        this.getHeaderMaxHeight() - STATUS_BAR_HEIGHT,
        this.getHeaderMinHeight() - STATUS_BAR_HEIGHT
      ],
      extrapolate: 'clamp'
    });
  }

  getNavBarOpacity() {
    return this.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: 'clamp'
    });
  }

  getNavBarForegroundOpacity() {
    const { alwaysShowNavBar } = this.props;
    return this.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
      extrapolate: 'clamp'
    });
  }

  getNavBarBottomWidth() {
    const { alwaysShowNavBar } = this.props;
    return this.scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: [0, alwaysShowNavBar ? 1 : 0],
      extrapolate: 'clamp'
    });
  }

  getImageOpacity() {
    return this.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    });
  }

  getImageTranslate() {
    return this.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 0, -50],
      extrapolate: 'clamp'
    });
  }

  getImageScale() {
    return this.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getBackgroundImageScale(), 1, 1],
      extrapolate: 'clamp'
    });
  }

  renderBackgroundImage() {
    const { renderBackgroundHeader, token } = this.props;
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.View
        style={[
          styles.backgroundImage,
          {
            height:
              token && this.state.headerHeight !== 0
                ? this.getHeaderMaxHeight()
                : null,
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslate }, { scale: imageScale }]
          }
        ]}
      >
        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;

            if (height !== this.state.headerHeight) {
              this.setState({
                headerHeight: height
              });
            }
          }}
        >
          {renderBackgroundHeader()}
        </View>
      </Animated.View>
    );
  }

  renderNavbarBackground() {
    const { navbarColor } = this.props;
    const navBarOpacity = this.getNavBarOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            backgroundColor: navbarColor,
            opacity: navBarOpacity
          }
        ]}
      />
    );
  }

  renderHeaderBackground() {
    const imageOpacity = this.getImageOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            opacity: imageOpacity,
            backgroundColor: 'transparent'
          }
        ]}
      >
        {this.renderBackgroundImage()}
      </Animated.View>
    );
  }

  getLightNavBarBottomWidth() {
    const { alwaysShowNavBar } = this.props;
    return this.scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: [0, alwaysShowNavBar ? 1 : 0],
      extrapolate: 'clamp'
    });
  }

  renderHeaderForeground() {
    const {
      renderNavBar, renderStickyNavBar, author, profile
    } = this.props;
    const navBarOpacity = this.getNavBarForegroundOpacity();

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            height: this.getHeaderMinHeight(),
            opacity: navBarOpacity,
            borderBottomWidth: this.getNavBarBottomWidth(),
            borderBottomColor: 'rgb(230, 230, 230)'
          }
        ]}
      >
        <RNParallaxHeader
          ref={this.header}
          renderStickyNavBar={renderStickyNavBar}
          renderNavBar={renderNavBar}
          author={author && author.id ? author : profile}
          profile={profile}
        />
      </Animated.View>
    );
  }

  renderScrollView = () => {
    const {
      scrollEventThrottle, profile, author, isTab
    } = this.props;

    if (isTab && (!profile || (profile && !profile.id))) {
      return <View />;
    }

    return (
      <NewsFeed
        type="author"
        authorId={
          isTab
            ? profile && profile.id
            : (author && author.id) || (profile && profile.id)
        }
        isAuthorDetail
        scrollViewProps={{
          scrollEventThrottle,
          overScrollMode: 'always',
          onScroll:
            Platform.OS === 'ios'
              ? Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: this.scrollY } }
                  }
                ],
                {
                  listener: (event) => {
                    const offsetY = event.nativeEvent.contentOffset.y;
                    if (offsetY >= 70) {
                      if (this.header && this.header.current) {
                        this.header.current.renderStickyNav();
                      }
                    } else {
                      this.header.current.renderLightNav();
                    }
                  }
                }
              )
              : (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;

                if (
                  offsetY === 0
                    && this.scrollY.__getValue() === ANIMATED_VALUE
                ) {
                  if (
                    this.header
                      && this.header.current
                      && this.header.current.state.stickyHeader
                  ) {
                    this.header.current.renderLightNav();
                    return Animated.timing(this.scrollY, {
                      toValue: 0,
                      duration: ANIMATED_DURATION
                    }).start();
                  }
                }
                if (offsetY > ANIMATED_VALUE + 100) {
                  if (
                    this.header
                      && this.header.current
                      && !this.header.current.state.stickyHeader
                      && this.scrollY.__getValue() !== ANIMATED_VALUE
                  ) {
                    Animated.timing(this.scrollY, {
                      toValue: ANIMATED_VALUE,
                      duration: ANIMATED_DURATION
                    }).start();
                    this.header.current.renderStickyNav();
                  }
                }
              }
        }}
      />
    );
  };

  renderTabBar = () => {
    const {
      author, profile, isTab, token
    } = this.props;

    if (isTab && !token) {
      return <View />;
    }

    if (
      (!isTab && this.state.headerHeight)
      || (token && isTab && !profile.isAnonymous && this.state.headerHeight)
    ) {
      return (
        <View
          style={{
            flex: 1
          }}
          pointerEvents="box-none"
        >
          <Animated.View
            style={[
              {
                transform: [{ translateY: this.getTabBarHeaderHeight() }]
              },
              this.props.innerContainerStyle
            ]}
            pointerEvents="box-none"
          >
            <ParallaxTabBar
              author={author && author.id ? author : profile}
              profile={profile}
              renderMainScrollView={this.renderScrollView}
              isTab={isTab}
            />
          </Animated.View>
        </View>
      );
    }

    return <View />;
  };

  render() {
    const { navbarColor, statusBarColor, containerStyle } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <View
          style={{
            height: STATUS_BAR_HEIGHT,
            backgroundColor: statusBarColor || navbarColor
          }}
        />
        {this.renderNavbarBackground()}
        {this.renderHeaderBackground()}
        {this.renderHeaderForeground()}
        {this.renderTabBar()}
      </View>
    );
  }
}

ParallaxScrollView.defaultProps = {
  renderNavBar: () => <View />,
  navbarColor: DEFAULT_NAVBAR_COLOR,
  headerMinHeight: DEFAULT_HEADER_MIN_HEIGHT,
  scrollEventThrottle: SCROLL_EVENT_THROTTLE,
  extraScrollHeight: DEFAULT_EXTRA_SCROLL_HEIGHT,
  backgroundImageScale: DEFAULT_BACKGROUND_IMAGE_SCALE,
  innerContainerStyle: null,
  containerStyle: null,
  alwaysShowNavBar: true,
  statusBarColor: null
};

export default connect(state => ({
  token: state.token.token,
  profile: state.me.profile
}))(ParallaxScrollView);

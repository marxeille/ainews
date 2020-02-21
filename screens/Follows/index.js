import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Navigation } from 'react-native-navigation';
import { wrap } from '@agiletechvn/react-theme';
import InteractableTabView from 'AINews/src/components/common/InteractableTabView';
import CategorySelector from 'AINews/src/elements/CategorySelector';
import { WINDOW_WIDTH } from 'AINews/src/utils/trivia';
import { t } from 'AINews/src/utils/LocalizationUtils';
import Bootstrap from 'AINews/src/App/Bootstrap';
import AuthorList from 'AINews/src/screens/Follows/AuthorList';
import colors from 'AINews/src/themes/colors';
import images from 'AINews/assets/images';

type Props = {
  componentId: String
};

const FollowComponents = (props: Props) => {
  const { componentId } = props;

  const token = useSelector(state => state.token.token);

  const onLoginPress = useCallback(() => {
    Bootstrap.push({
      component: {
        name: 'Login',
        passProps: {
          rootComponentId: componentId
        }
      }
    });
  }, [componentId]);

  const renderFollowingAuthors = useCallback(() => {
    if (token) {
      return <AuthorList type="following" />;
    }
    return (
      <View cls="flx-i aic jcc">
        <Text cls="ff-sfR tc fs-14">{t('followings.notLogin')}</Text>
        <View cls="hg-8" />
        <TouchableOpacity
          cls="bg-reddish pvn-5 phn-10 aic jcc brs-3 b--categoryTitle"
          activeOpacity={0.6}
          onPress={onLoginPress}
        >
          <Text cls="brandWhite fs-14 ff-sfB">{t('followings.login')}</Text>
        </TouchableOpacity>
      </View>
    );
  }, [token, onLoginPress]);

  const renderExploreAuthors = useCallback(
    () => <AuthorList type="suggestion" />,
    []
  );

  const categories = useMemo(
    () => [
      { name: t('followings.followings') },
      { name: t('followings.explore') }
    ],
    []
  );

  function renderTabBar(tabBarProps) {
    return (
      <View>
        <CategorySelector
          viewableWidth={WINDOW_WIDTH}
          {...tabBarProps}
          categories={categories}
          centerize
        />
        <View cls="hg-8 bg-empty" />
      </View>
    );
  }

  return (
    <SafeAreaView cls="flx-i" forceInset={{ top: 'always' }}>
      <View cls="hg-44 jcc aic">
        <Text cls="ff-sfSb fs-18">{t('followings.followAuthor')}</Text>
      </View>
      <InteractableTabView renderTabBar={wrap(renderTabBar)}>
        {renderFollowingAuthors()}
        {renderExploreAuthors()}
      </InteractableTabView>
    </SafeAreaView>
  );
};

const FollowComponent = wrap(FollowComponents);

class Follows extends React.Component {
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  componentDidAppear() {
    if (Platform.OS === 'ios') {
      // StatusBar.setBarStyle('dark-content', true);
      Navigation.mergeOptions(this.props.componentId, {
        bottomTab: {
          selectedTextColor: colors.reddish,
          textColor: colors.tabBarGrey,
          fontFamily: 'SFProText-Bold',
          icon: images.followingOff,
          selectedIcon: images.followingOn,
          text: 'Theo dõi'
        }
      });
    } else {
      // StatusBar.setBarStyle('dark-content', true);
      // StatusBar.setBackgroundColor('white');
    }
  }

  render() {
    return <FollowComponent {...this.props} />;
  }
}

export default wrap(Follows);

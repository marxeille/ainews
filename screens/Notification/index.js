import React, { useEffect, memo } from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'redux';
import { Navigation } from 'react-native-navigation';

import { wrap } from '@agiletechvn/react-theme';
import useNotifications from 'AINews/src/hooks/useNotifications';
import SingleOERFlatList from 'AINews/src/components/common/SingleOERFlatList';
import { t } from 'AINews/src/utils/LocalizationUtils';
import Bootstrap from 'AINews/src/App/Bootstrap';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import colors from 'AINews/src/themes/colors';
import images from 'AINews/assets/images';

import { getNotiIcon, getNotiContent, navigateNotification } from './utils';

type Props = {
  componentId: String,
  token: String
};

const ListNotification = () => {
  const {
    notifications,
    refresh,
    refreshing,
    load,
    loading
  } = useNotifications({
    pageSize: 10
  });

  useEffect(() => {
    load();
  }, [load]);

  const renderListEmptyComponent = memo(
    wrap(() => {
      if (!loading) {
        return (
          <View cls="aic mtn-16">
            <Text cls="ff-sfR fs-16">Chưa có thông báo nào</Text>
          </View>
        );
      }
      return null;
    })
  );

  function renderItem({ item, index }) {
    const {
      createdAt,
      data: { user, author, content },
      type
    } = item;

    const avatarImageUrl = type === 2 ? author && author.avatar : user && user.avatar;
    const fullName = type === 2 ? author && author.fullName : user && user.fullName;

    const onNotiPress = () => {
      navigateNotification(type, item);
    };

    return (
      <DebounceTouch cls="bg-white pvn-20 phn-20 flx-row" onPress={onNotiPress}>
        <View cls="prn-20">
          <View cls="hg-50 wd-50">
            <View
              cls={[
                'circleFn-50 oh bwh b--empty',
                { 'aic jcc': !avatarImageUrl }
              ]}
            >
              {avatarImageUrl ? (
                <Image
                  cls="flx-i"
                  source={{ uri: avatarImageUrl }}
                  resizeMode="center"
                />
              ) : (
                <Image
                  cls="flx-i"
                  source={images.personal}
                  resizeMode="contain"
                />
              )}
            </View>
            <View cls="absolute right-0 bottom-0 circleFn-16 oh">
              <Image
                cls="flx-i"
                source={getNotiIcon(type)}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <View cls="flx-i">
          {!!fullName && (
            <Text cls="ff-sfR fs-14">
              <Text cls="ff-sfSb fs-14">{fullName}</Text>
              {` ${getNotiContent(type)}`}
            </Text>
          )}
          {!!content && <Text cls="ff-sfR fs-14 mtn-6">{content}</Text>}
          {!!createdAt && (
            <Text cls="ff-sfR fs-12 commonGrey mtn-6">
              {moment(createdAt).fromNow()}
            </Text>
          )}
        </View>
      </DebounceTouch>
    );
  }

  function keyExtractor(item) {
    return `${item.eventId}`;
  }

  const renderItemSeparatorComponent = memo(wrap(() => <View cls="mtn-2" />));

  return (
    <View cls="flx-i mtn-10">
      <SingleOERFlatList
        data={notifications || []}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmptyComponent}
        ItemSeparatorComponent={renderItemSeparatorComponent}
        renderItem={wrap(renderItem)}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        onEndReached={load}
        onRefresh={refresh}
      />
    </View>
  );
};

const ListNotificationWrap = wrap(ListNotification);

class Notification extends React.PureComponent<Props> {
  static options() {
    return {
      topBar: {
        noBorder: true,
        visible: true
      }
    };
  }

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
          icon: images.notiOff,
          selectedIcon: images.notiOn,
          text: 'Thông báo'
        }
      });
    } else {
      // StatusBar.setBarStyle('dark-content', true);
      // StatusBar.setBackgroundColor('white');
    }
  }

  onLoginPress = () => {
    const { componentId } = this.props;

    Bootstrap.push({
      component: {
        name: 'Login',
        passProps: {
          rootComponentId: componentId
        }
      }
    });
  };

  render() {
    const { token } = this.props;
    return (
      <SafeAreaView cls="flx-i" forceInset={{ top: 'always' }}>
        <View cls="aic jcc hg-44">
          <Text cls="ff-sfSb fs-18">Thông báo</Text>
        </View>
        <View cls="flx-i bg-settingBackground">
          {token ? (
            <ListNotificationWrap {...this.props} />
          ) : (
            <View cls="flx-i aic jcc">
              <Text cls="ff-sfR tc fs-14">
                Hãy đăng nhập để nhận được thông báo
              </Text>
              <View cls="hg-8" />
              <TouchableOpacity
                cls="bg-reddish pvn-5 phn-10 aic jcc brs-3 b--categoryTitle"
                activeOpacity={0.6}
                onPress={this.onLoginPress}
              >
                <Text cls="brandWhite fs-14 ff-sfB">
                  {t('followings.login')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default compose(
  connect(state => ({
    token: state.token.token
  })),
  wrap
)(Notification);

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  View, Image, Text
} from 'react-native';

import { wrap } from '@agiletechvn/react-theme';
import images from 'AINews/assets/images';
import { t } from 'AINews/src/utils/LocalizationUtils';
import colors from 'AINews/src/themes/colors';
import Bootstrap from 'AINews/src/App/Bootstrap';
import ImageButton from 'AINews/src/elements/ImageButton';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { getAuthorProfile } from 'AINews/src/store/actions/authors';
import FollowButton from 'AINews/src/components/FollowButton';
import { fixAndroidBoldCls } from 'AINews/src/utils/trivia';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';

type Props = {
  componentId: String,
  token: String,
  profile: {},
  author: Object,
  isTab: Boolean
};

class BackgroundHeader extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      coverHeight: 0,
      currentAuthor: props.isTab ? props.profile : null
    };
  }

  componentDidMount = async () => {
    const { author, isTab } = this.props;

    if (!isTab) {
      try {
        const result = await callSagaRequest(getAuthorProfile, {
          authorId: author.id
        });
        if (result) {
          this.setState({
            currentAuthor: result
          });
        }
      } catch (err) {
        console.log('Personal get author error', err);
      }
    }
  };

  onEditPress = () => {
    Bootstrap.push({
      component: {
        name: 'PersonalEdit',
        options: {
          topBar: {
            title: {
              text: t('personalEdit.title')
            },
            backButton: {
              icon: images.back,
              color: colors.commonGrey
            }
          }
        }
      }
    });
  };

  onLoginPress = () => {
    const { componentId } = this.props;
    Bootstrap.push({
      component: {
        name: 'Login',
        rootComponentId: componentId
      }
    });
  };

  handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;

    this.setState({
      coverHeight: height / 2
    });
  };

  renderProfileInfo = () => {
    const { currentAuthor } = this.state;
    const { profile, isTab } = this.props;
    const authorInfo = isTab ? profile : currentAuthor;
    const checkAuthorIsMe = authorInfo && authorInfo.id && authorInfo.id === profile.id;

    if ((!isTab && !currentAuthor) || !authorInfo) {
      return <View />;
    }
    return (
      <View cls="ph3">
        <View>
          <View cls="flx-row jcsb aic">
            <View cls="flx-i">
              <Text cls={fixAndroidBoldCls('ff-sfB fs-20 commonBlack')}>
                {authorInfo.fullName || t('personal.anonymous')}
              </Text>
            </View>
            {checkAuthorIsMe ? (
              isTab ? (
                <DebounceTouch onPress={this.onEditPress} cls="pa3 pr0">
                  <Text cls="ff-sfB reddish fs-14">{t('personal.edit')}</Text>
                </DebounceTouch>
              ) : (
                <View cls="pa3">
                  <Text cls="ff-sfB white fs-14">Temp</Text>
                </View>
              )
            ) : (
              <View cls="pa3 pt2 pr0">
                <FollowButton id={authorInfo.id} />
              </View>
            )}
          </View>
          <View cls="mb3 flx-row aic">
            <Text cls="fs-14 ff-sf">
              {`${authorInfo.numberFollower || 0} ${t('personal.following')}`}
              {checkAuthorIsMe ? (
                <Text cls="commonGrey fs-14">{`• ${'0'} AI Coins`}</Text>
              ) : (
                <Text cls="commonGrey fs-14">{`• ${'0'} News per day`}</Text>
              )}
            </Text>
            {checkAuthorIsMe ? (
              <View cls="ml1">
                <ImageButton
                  image={images.coin}
                  width={16}
                  height={16}
                  callback={() => {}}
                />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  renderProfileInTab = () => {
    const { token } = this.props;

    if (!token) {
      return (
        <View cls="ph3">
          <DebounceTouch onPress={this.onLoginPress}>
            <Text cls={fixAndroidBoldCls('ff-sfB fs-20 reddish mt1')}>
              {t('personal.signInSignUp')}
            </Text>
          </DebounceTouch>

          <Text cls="commonBlack fs-14 ff-sf mt3">{t('personal.note')}</Text>
        </View>
      );
    }
    return this.renderProfileInfo();
  };

  render() {
    const { coverHeight, currentAuthor } = this.state;
    const { profile, isTab } = this.props;
    const authorInfo = isTab ? profile : currentAuthor;

    return (
      <View>
        <View
          style={{
            height: 150,
            width: '100%'
          }}
        >
          <View
            style={{
              height: '80%',
              width: '100%'
            }}
            onLayout={this.handleLayout}
          >
            <Image
              cls="pHg-100 pWd-100 bg-white"
              source={
                authorInfo && authorInfo.coverPicture
                  ? { uri: authorInfo.coverPicture }
                  : images.noCover
              }
              resizeMode="stretch"
            />
          </View>
          <View
            cls={`sz-${coverHeight} brs-${coverHeight
              / 2} absolute bottom-0 left-1 oh bw-1 b--white`}
          >
            <Image
              cls="pHg-100 pWd-100 bg-white"
              source={
                authorInfo && authorInfo.avatar
                  ? { uri: authorInfo.avatar }
                  : images.noAvatar
              }
              resizeMode="cover"
            />
          </View>
        </View>
        {isTab ? this.renderProfileInTab() : this.renderProfileInfo()}
      </View>
    );
  }
}

export default compose(
  connect(state => ({
    token: state.token.token,
    profile: state.me.profile
  })),
  wrap
)(BackgroundHeader);

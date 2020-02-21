import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { compose } from 'redux';

import { wrap } from '@agiletechvn/react-theme';
import ImageButton from 'AINews/src/elements/ImageButton';
import Bootstrap from 'AINews/src/App/Bootstrap';
import images from 'AINews/assets/images';
import colors from 'AINews/src/themes/colors';
import { t } from 'AINews/src/utils/LocalizationUtils';

type Props = {
  headerHeight: Number,
  statusBarHeight: Number,
  navBarHeight: Number,
  author: Object,
  profile: Object,
  isTab: Boolean,
  token: String
};

class PersonalStickyNavBar extends PureComponent<Props> {
  onBack = () => {
    Bootstrap.pop();
  };

  onNavigateToSetting = () => {
    Bootstrap.push({
      component: {
        name: 'Setting',
        options: {
          topBar: {
            title: {
              text: 'Settings'
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

  renderAuthorName = () => {
    const { author, profile, isTab } = this.props;

    return (
      <Text cls="tc">
        {isTab ? profile.fullName : author.fullName || t('personal.anonymous')}
      </Text>
    );
  };

  renderProfileInTab = () => {
    const { navBarHeight, token } = this.props;

    return (
      <View cls={`hg-${navBarHeight} flx-row aic ph3`}>
        <View />
        <View cls="flx-i aic jcc">{this.renderAuthorName()}</View>
        {token ? (
          <ImageButton
            image={images.personal}
            width={22}
            height={22}
            callback={this.onNavigateToSetting}
          />
        ) : null}
      </View>
    );
  };

  renderProfileInAuthorDetail = () => {
    const { navBarHeight, author, profile } = this.props;

    if (author && author.id && author.id === profile.id) {
      return (
        <View cls={`hg-${navBarHeight} flx-row aic ph3`}>
          <View>
            <ImageButton
              image={images.back}
              width={16}
              height={16}
              callback={this.onBack}
              containerCls="aic pv2 pr4"
            />
          </View>
          <View cls="flx-i aic jcc">{this.renderAuthorName()}</View>
          <View />
        </View>
      );
    }

    return (
      <View cls={`hg-${navBarHeight} jcsb flx-row ph3 aic`}>
        <View cls="aic">
          <ImageButton
            image={images.back}
            hitSlop={{
              top: 14, left: 14, bottom: 14, right: 14
            }}
            width={16}
            height={16}
            callback={this.onBack}
            containerCls="aic pv2 pr4"
          />
        </View>
        <View cls="flx-i aic jcc">{this.renderAuthorName()}</View>
        <View cls="flx-row aic">
          <View cls="mr3">
            <ImageButton
              hitSlop={{
                top: 14, left: 14, bottom: 14, right: 14
              }}
              image={images.share}
              width={16}
              height={16}
              callback={() => { }}
            />
          </View>
          <ImageButton
            hitSlop={{
              top: 14, left: 14, bottom: 14, right: 14
            }}
            image={images.report}
            width={16}
            height={16}
            callback={() => { }}
          />
        </View>
      </View>
    );
  };

  render() {
    const { headerHeight, statusBarHeight, isTab } = this.props;

    return (
      <View cls={`hg-${headerHeight}`}>
        <View cls={`hg-${statusBarHeight}`} />
        {isTab ? this.renderProfileInTab() : this.renderProfileInAuthorDetail()}
      </View>
    );
  }
}

export default compose(
  connect(state => ({
    token: state.token.token
  })),
  wrap
)(PersonalStickyNavBar);

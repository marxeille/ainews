import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import ImageButton from 'AINews/src/elements/ImageButton';
import Bootstrap from 'AINews/src/App/Bootstrap';

import { wrap } from '@agiletechvn/react-theme';
import images from 'AINews/assets/images';
import colors from 'AINews/src/themes/colors';

type Props = {
  headerHeight: Number,
  statusBarHeight: Number,
  navBarHeight: Number,
  authorId: String,
  profile: Object,
  isTab: Boolean
};

class PersonalNavBar extends PureComponent<Props> {
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

  renderProfileInTab = () => {
    const { navBarHeight } = this.props;

    return (
      <View cls={`hg-${navBarHeight} jcsb flx-row ph3 aic`}>
        <View />
        <ImageButton
          image={images.settings}
          width={22}
          height={22}
          callback={this.onNavigateToSetting}
        />
      </View>
    );
  };

  renderProfileInAuthorDetail = () => {
    const { navBarHeight, authorId, profile } = this.props;

    if (authorId && authorId === profile.id) {
      return (
        <View cls={`hg-${navBarHeight} jcsb flx-row ph3 aic`}>
          <View>
            <ImageButton
              image={images.whiteBack}
              width={16}
              height={16}
              callback={this.onBack}
              containerCls="aic pv2 pr4"
            />
          </View>
        </View>
      );
    }

    return (
      <View cls={`hg-${navBarHeight} jcsb flx-row ph3 aic`}>
        <View cls="">
          <ImageButton
            image={images.whiteBack}
            width={16}
            height={16}
            callback={this.onBack}
            containerCls="aic pv2 pr4"
          />
        </View>
        <View cls="flx-row aic">
          <View cls="mr3">
            <ImageButton
              image={images.whiteShare}
              width={16}
              height={16}
              callback={() => {}}
            />
          </View>
          <ImageButton
            image={images.whiteMore}
            width={16}
            height={16}
            callback={() => {}}
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

export default connect(state => ({}))(wrap(PersonalNavBar));

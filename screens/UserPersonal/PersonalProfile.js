import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import { t } from 'AINews/src/utils/LocalizationUtils';
import colors from 'AINews/src/themes/colors';
import Bootstrap from '../../App/Bootstrap';
import images from '../../../assets/images';
import PersonalProfileHeader from './PersonalProfileHeader';

const Row = ({ title, iconName, onPress }) => (
  <DebounceTouch cls="flx-row hg-48 aic" onPress={onPress}>
    <Image source={images[iconName]} cls="wd-24 hg-24" resizeMode="contain" />
    <Text cls="ff-sfR fs-18 profileTitle mln-20">{title}</Text>
  </DebounceTouch>
);

const RowButton = wrap(Row);

const Content = ({ me }) => {
  const pushTo = ({ screenName, title, passProps }) => {
    Bootstrap.push({
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: title
            },
            backButton: {
              icon: images.back,
              color: colors.commonGrey
            }
          }
        },
        passProps
      }
    });
  };

  const onSettingPress = () => {
    pushTo({
      screenName: 'Setting',
      title: t('personal.appSettings')
    });
  };

  const onPostsPress = () => {
    pushTo({
      screenName: 'PersonalPosts',
      title: t('personal.myPosts'),
      passProps: {
        authorId: me.author.id
      }
    });
  };

  const onCommentPress = () => {
    pushTo({
      screenName: 'PersonalComments',
      title: t('personal.comments')
    });
  };

  const onSavedPress = () => {
    pushTo({
      screenName: 'PersonalSaved',
      title: t('personal.save')
    });
  };

  return (
    <View>
      <View cls="bg-white mtn-10 phn-20 pvn-16">
        <RowButton
          title={t('personal.posts')}
          iconName="icPosts"
          onPress={onPostsPress}
        />
        <RowButton
          title={t('personal.comments')}
          iconName="icComment2"
          onPress={onCommentPress}
        />
        <RowButton
          title={t('personal.save')}
          iconName="icSave"
          onPress={onSavedPress}
        />
        <RowButton
          title={t('personal.appSettings')}
          iconName="icSettings"
          onPress={onSettingPress}
        />
      </View>
    </View>
  );
};

const PersonalContent = wrap(Content);

const Profile = ({ me }) => (
  <View cls="flx-i">
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <View cls="mtn-16">
        <PersonalProfileHeader me={me} />
      </View>
      <View cls="flx-i bg-settingBackground">
        <PersonalContent me={me} />
      </View>
    </ScrollView>
  </View>
);

const PersonalProfile = wrap(Profile);

export default PersonalProfile;

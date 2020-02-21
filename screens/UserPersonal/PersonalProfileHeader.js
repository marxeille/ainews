import React, { useEffect, memo } from "react";
import { View, Text } from "react-native";
import { wrap } from "@agiletechvn/react-theme";
import ImageWithPlaceholder from "AINews/src/elements/ImageWithPlaceholder";
import DebounceTouch from "AINews/src/components/common/DebounceTouch";
import { t } from "AINews/src/utils/LocalizationUtils";
import colors from "AINews/src/themes/colors";
import FollowButton from "AINews/src/components/FollowButton";
import useAuthorDetails from "AINews/src/hooks/useAuthorDetails";

import Bootstrap from "../../App/Bootstrap";
import images from "../../../assets/images";
import UserReport from "./components/UserReport";

function Header({ me, isAuthor }) {
  let profile = { ...me.author };

  if (isAuthor) {
    const { authorDetail } = useAuthorDetails(me.author.id);
    profile = { ...me.author, ...authorDetail };
  }

  const onEditPress = () =>
    Bootstrap.push({
      component: {
        name: "PersonalEdit",
        options: {
          topBar: {
            title: {
              text: t("personalEdit.title")
            },
            backButton: {
              icon: images.back,
              color: colors.commonGrey
            }
          }
        }
      }
    });

  if (!profile) {
    return null;
  }

  return (
    <View>
      <View cls="mhn-20">
        <View cls="flx-row">
          <View cls="circleFn-72 bg-white b--empty bwh oh">
            <ImageWithPlaceholder
              source={{ uri: profile.avatar }}
              defaultImage={images.noAvatar}
              cls="bg-white fullView"
              resizeMode="contain"
            />
          </View>
          <View cls="flx-i mln-16 ptn-6 jcc">
            <Text cls="ff-sfB fs-20 profileTitle">{profile.fullName}</Text>
            {!isAuthor ? (
              <DebounceTouch
                hitSlop={{
                  top: 12,
                  left: 12,
                  right: 12,
                  bottom: 12
                }}
                cls="brs-4 b--tabHeaderUnselected mtn-4 hg-28"
                onPress={onEditPress}
              >
                <Text cls="fs-12 ff-sfSb tabHeaderUnselected">
                  {t("personal.seeAndEdit")}
                </Text>
              </DebounceTouch>
            ) : (
              <View cls="mtn-8 flx-row aic">
                <FollowButton
                  id={profile.id}
                  containerCls="hg-28 wd-132 jcc aic"
                />
                <UserReport />
              </View>
            )}
          </View>
        </View>
        <View cls="flx-row mtn-28 mbn-8">
          <View cls="flx-i">
            <Text cls="profileTitle ff-sfSb fs-20">
              {profile.numberFollower ? profile.numberFollower : 0}
            </Text>
            <Text cls="mtn-4 tabHeaderUnselected ff-sfR fs-14">
              {t("personal.followers")}
            </Text>
          </View>
          {/* <View cls="flx-i">
              <Text cls="profileTitle ff-sfSb fs-20">
                {profile.numberFollowing ? profile.numberFollowing : 0}
              </Text>
              <Text cls="mtn-4 tabHeaderUnselected ff-sfR fs-14">
                {t('personal.following')}
              </Text>
            </View> */}
          <View cls="flx-i">
            <Text cls="profileTitle ff-sfSb fs-20">
              {profile.numberPost ? profile.numberPost : 0}
            </Text>
            <Text cls="mtn-4 tabHeaderUnselected ff-sfR fs-14">
              {t("personal.posts")}
            </Text>
          </View>
        </View>
      </View>
      {!!profile.about && (
        <View cls="bg-white pbn-16">
          <View cls="bwh btw-0 blw-0 brw-0 b--empty" />
          <Text cls="ff-sfB phn-20 mtn-16 profileTitle fs-16">
            {t("personal.about")}
          </Text>
          <Text cls="ff-sfR phn-20 aboutTitle fs-16 mtn-8">
            {profile.about}
          </Text>
        </View>
      )}
    </View>
  );
}

const PersonalProfileHeader = wrap(Header);

export default PersonalProfileHeader;

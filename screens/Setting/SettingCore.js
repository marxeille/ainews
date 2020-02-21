import React, { PureComponent } from "react";
import { compose } from "redux";
import { View, ScrollView, Text, Alert } from "react-native";
import { wrap } from "@agiletechvn/react-theme";
import { Field, change } from "redux-form";

import Bootstrap from "AINews/src/App/Bootstrap";
import { t } from "AINews/src/utils/LocalizationUtils";
import colors from "AINews/src/themes/colors";
import { SwitchField } from "AINews/src/forms";
import ImageButton from "AINews/src/elements/ImageButton";
import images from "../../../assets/images";

import CategoriesRow from "./CategoriesRow";
import SettingRow from "./SettingRow";
import LogoutButton from "./LogoutButton";

type Props = {
  saveTheme: Function,
  dispatch: Function
};

class SettingCore extends PureComponent<Props> {
  onThemeChange = input => {
    const { saveTheme, dispatch } = this.props;

    Alert.alert("Notification", "Are you sure that you want to change theme?", [
      {
        text: "OK",
        onPress: async () => {
          saveTheme(input);
          await Bootstrap.startApp(true);
        }
      },
      {
        text: "Cancel",
        onPress: () => {
          dispatch(change("SettingForm", "theme", !input));
        }
      }
    ]);
  };

  onSettingRowPress = screenName => {
    Bootstrap.push({
      component: {
        name: screenName,
        options: {
          topBar: {
            backButton: {
              icon: images.back,
              color: colors.commonGrey
            }
          }
        }
      }
    });
  };

  render() {
    return (
      <ScrollView cls="flx-i bg-separatingLine">
        <View cls="hg-10" />
        <View cls="bg-primary ph3">
          <View cls="hg-60 jcc">
            <Text cls="fs-10 fw5 secondary">{t("personal.myFeeds")}</Text>
          </View>
          <CategoriesRow
            onPress={() => this.onSettingRowPress("CategoryConfiguration")}
          />
        </View>
        <View cls="hg-10" />
        <View cls="bg-primary ph3">
          <View cls="hg-60 jcc">
            <Text cls="fs-10 fw5 secondary">{t("personal.appSettings")}</Text>
          </View>

          <SettingRow leftTitle={t("personal.nightMode")}>
            <Field
              name="theme"
              component={SwitchField}
              onChange={this.onThemeChange}
            />
          </SettingRow>
        </View>
        {/* <View cls="hg-1 bg-separatingLine" />
        <View cls="bg-primary ph3">
          <SettingRow leftTitle={t('personal.textSize')}>
            <ImageButton
              image={images.chevronRight}
              width={16}
              height={16}
              callback={() => {}}
            />
          </SettingRow>
        </View> */}
        <View cls="hg-10" />
        {/* <View cls="bg-primary">
          <SettingRow leftTitle={t("personal.supportAndLegal")}>
            <ImageButton
              image={images.chevronRight}
              width={16}
              height={16}
              callback={() => {}}
            />
          </SettingRow>
        </View> */}
        <View cls="hg-10" />
        <LogoutButton />
      </ScrollView>
    );
  }
}

export default compose(wrap)(SettingCore);

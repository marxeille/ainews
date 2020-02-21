import React, { useRef, memo, useContext, useMemo } from "react";
import { useSelector, connect } from "react-redux";
import { View, Text, TouchableWithoutFeedback, Alert } from "react-native";
import moment from "moment";
import { compose } from "redux";

import { wrap } from "@agiletechvn/react-theme";
import ActionSheet from "react-native-actionsheet";
import DebounceTouch from "AINews/src/components/common/DebounceTouch";

import Bootstrap from "AINews/src/App/Bootstrap";
import FollowButton from "AINews/src/components/FollowButton";
import { ignorePost, reportPost } from "AINews/src/store/actions/user";

import NavigationContext from "AINews/src/components/common/NavigationContext";
import {
  fixAndroidBoldCls,
  showLoginRequiredAlert,
  showConfirmAlert
} from "AINews/src/utils/trivia";
import { callSagaRequest } from "AINews/src/utils/RequestHandler";
import { bookMarkPost } from "AINews/src/utils/post";

import ImageWithPlaceholder from "../../elements/ImageWithPlaceholder";
import images from "../../../assets/images";
import { t } from "../../utils/LocalizationUtils";
import ImageButton from "../../elements/ImageButton";

type Props = {
  postId: String,
  createdAt: String,
  author: Object,
  type: String,
  saved: Boolean,
  hidePost?: Function,
  inDetailsScreen?: Boolean,
  reports: Array
};

const NewsAuthorSection = (props: Props) => {
  const {
    postId,
    createdAt,
    author,
    type,
    saved,
    hidePost,
    inDetailsScreen,
    reports
  } = props;

  const { componentId } = useContext(NavigationContext);
  const { token } = useSelector(state => state.token);
  const postInteractActionSheetRef = useRef();
  const reportReasonActionSheetRef = useRef();

  const defaultReportOptions = useRef([
    "nudity",
    "violence",
    "hatespeech",
    "dangerous",
    "childabuse",
    "terrorism",
    "spam",
    "cancel"
  ]);
  const reportOptionsOrder = useRef();
  const reportOptions = useRef();

  reportOptionsOrder.current = reports.map(report => {
    if (defaultReportOptions.current.includes(report.key)) {
      return report.id;
    }
  });

  reportOptions.current = reports.map(report => {
    switch (report.key) {
      case "nudity":
        return t("postInteract.reportReason.nudity");
      case "violence":
        return t("postInteract.reportReason.violence");
      case "hatespeech":
        return t("postInteract.reportReason.incitingHatred");
      case "dangerous":
        return t("postInteract.reportReason.dangerous");
      case "childabuse":
        return t("postInteract.reportReason.childAbuse");
      case "terrorism":
        return t("postInteract.reportReason.terrorism");
      case "spam":
        return t("postInteract.reportReason.spam");

      default:
    }
  });

  reportOptions.current.push(t("postInteract.reportReason.cancel"));

  const reasons = useMemo(() => reportOptions.current, []);

  const interactOptions =
    type === "category" || type === "categoryWithGroup"
      ? [
          saved ? t("postInteract.unsave") : t("postInteract.save"),
          t("postInteract.report"),
          t("postInteract.hide"),
          t("common.close")
        ]
      : [
          saved ? t("postInteract.unsave") : t("postInteract.save"),
          t("postInteract.report"),

          t("common.close")
        ];

  const onAuthorPress = () => {
    if (author && author.id) {
      Bootstrap.push({
        component: {
          name: "Personal",
          passProps: {
            author
            // isTab: false
          }
          // options: {
          //   topBar: {
          //     visible: false,
          //     height: 0
          //   }
          // }
        }
      });
    }
  };

  function onInteract() {
    console.log("id action", postId);

    if (postInteractActionSheetRef.current) {
      postInteractActionSheetRef.current.show();
    }
  }

  function onInteractItemSelect(index) {
    if (index < interactOptions.length - 1 && !token) {
      showLoginRequiredAlert(componentId);
      return;
    }

    if (index === 0) {
      bookMarkPost({
        saved,
        id: postId
      });
      return;
    }

    if (index === 1) {
      if (reportReasonActionSheetRef.current) {
        reportReasonActionSheetRef.current.show();
      }
      return;
    }

    if (index === 2) {
      if (type !== "category" && type !== "categoryWithGroup") {
        return;
      }

      // callSagaRequest(ignorePost, { postId });
      hidePost(postId);

      if (inDetailsScreen) {
        Bootstrap.pop();
      }
    }
  }

  function onReportItemSelect(index) {
    if (index === reasons.length - 1) {
      return;
    }

    showConfirmAlert(
      t("postInteract.reportConfirmTitle"),
      `${t("postInteract.reportConfirmDescription")} "${reasons[index]}" ?`,
      t("common.close"),
      t("postInteract.confirmReport"),
      async () => {
        let loadingOverlayId;
        try {
          loadingOverlayId = await Bootstrap.showLoadingOverlay(
            t("postInteract.sendingReport")
          );
          await callSagaRequest(reportPost, {
            postId,
            reason: reasons[index],
            reasonId: reportOptionsOrder.current[index]
          });
          await Bootstrap.dismissLoadingOverlay(loadingOverlayId);
          Alert.alert(
            t("postInteract.reportSuccessTitle"),
            t("postInteract.reportSuccessDescription")
          );
        } catch (err) {
          await Bootstrap.dismissLoadingOverlay(loadingOverlayId);
          Alert.alert(
            t("postInteract.reportErrorTitle"),
            t("postInteract.reportErrorDescription")
          );
        }
      }
    );
  }

  console.log("reasons", reasons);

  return (
    <View cls="pan-12">
      <TouchableWithoutFeedback>
        <View cls="flx-row aic flx-i">
          <DebounceTouch
            cls="flx-row aic flx-i"
            onPress={onAuthorPress}
            activeOpacity={0.7}
          >
            <View cls="circleFn-44 bg-white b--empty bwh oh">
              <ImageWithPlaceholder
                source={author && author.avatar ? { uri: author.avatar } : null}
                defaultImage={images.noAvatar}
                resizeMode="contain"
                cls="fullView bg-white"
              />
            </View>

            <View cls="wd-5" />
            <View cls="flx-i">
              <Text
                // numberOfLines={2}
                cls={fixAndroidBoldCls("fs-15 commonBlack ff-sfSb")}
              >
                {author.fullName || ""}
              </Text>
              <View cls="hg-1" />
              <Text cls="newsAuthorSectionTime fs-12 ff-sf">
                {moment(createdAt).fromNow()}
              </Text>
            </View>
          </DebounceTouch>
          <View cls="flx-row aic">
            {type !== "author" ? <FollowButton id={author.id} /> : null}
            <View cls="wd-12" />
            <ImageButton
              hitSlop={{
                top: 14,
                left: 14,
                bottom: 14,
                right: 14
              }}
              image={images.report}
              width={16}
              height={16}
              callback={onInteract}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ActionSheet
        ref={postInteractActionSheetRef}
        options={interactOptions}
        cancelButtonIndex={interactOptions.length - 1}
        onPress={onInteractItemSelect}
      />
      <ActionSheet
        ref={reportReasonActionSheetRef}
        options={reasons}
        cancelButtonIndex={reasons.length - 1}
        onPress={onReportItemSelect}
      />
    </View>
  );
};

NewsAuthorSection.defaultProps = {
  hidePost: () => {},
  inDetailsScreen: false
};

// export default memo(
//   wrap(NewsAuthorSection, 'defaultProps'),
//   (prevProps: Props, nextProps: Props) => prevProps.saved === nextProps.saved
// );

export default compose(
  connect(state => ({
    reports: state.report.reports
  }))
)(
  memo(
    wrap(NewsAuthorSection, "defaultProps"),
    (prevProps: Props, nextProps: Props) => false
  )
);

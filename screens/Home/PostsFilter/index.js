import React, { useState, useRef, useMemo } from "react";
import { TouchableWithoutFeedback, View, Text, Image } from "react-native";
import ActionSheet from "react-native-actionsheet";
import { wrap } from "@agiletechvn/react-theme";
import { t } from "AINews/src/utils/LocalizationUtils";
import images from "AINews/assets/images";

type Props = {
  onFilterChanged: number => void
};

const PostsFilters = [
  "trending",
  "createdTime",
  "upVoteNumber",
  "commentNumber",
  "recommend",
  "downVoteNumber"
];

const PostsFilter = (props: Props) => {
  const { onFilterChanged } = props;

  const [postsFilter, setPostsFilter] = useState(0);

  const actionSheetRef = useRef();

  const options = useMemo(() => {
    const filters = PostsFilters.map(option =>
      t(`groupNewsFeed.type.${option}`)
    );
    filters.push(t("common.close"));
    return filters;
  }, []);

  function onPostsFilterPress() {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  }

  function onPostsFilterItemSelect(index) {
    if (index < PostsFilters.length) {
      setPostsFilter(index);
      onFilterChanged(PostsFilters[index]);
    }
  }

  return (
    <View cls="bg-white">
      <TouchableWithoutFeedback onPress={onPostsFilterPress}>
        <View cls="phn-12 pv3 flx-row aic">
          <Text cls="fs-12">🔥</Text>
          <View cls="wd-5" />
          <Text cls="fs-11 ff-sfB">
            {t(`groupNewsFeed.type.${PostsFilters[postsFilter]}`).toUpperCase()}
          </Text>
          <View cls="wd-8" />
          <Image
            cls="wd-10 hg-7"
            resizeMode="contain"
            source={images.chevronDown}
          />
        </View>
      </TouchableWithoutFeedback>
      <ActionSheet
        ref={actionSheetRef}
        title={t("newsDetails.commentsFilterTitle")}
        options={options}
        cancelButtonIndex={6}
        onPress={onPostsFilterItemSelect}
      />
    </View>
  );
};

export default wrap(PostsFilter);

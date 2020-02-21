import React, { useRef, useEffect, memo, useState, useMemo } from "react";
import { View, ActivityIndicator, Animated } from "react-native";
import { Navigation } from "react-native-navigation";
import { wrap } from "@agiletechvn/react-theme";

import AuthorSuggestionList from "AINews/src/screens/Home/AuthorSuggestionList";
import CategorySuggestionList from "AINews/src/screens/Home/CategorySuggestionList";
import NewsGroupList from "AINews/src/screens/Home/NewsGroupList";

import CommonNewsItem from "./CommonNewsItem";
import SocialNewsItem from "./SocialNewsItem";
import FirstItem from "./GroupNewsItem/FirstItem";
import OtherItems from "./GroupNewsItem/OtherItems";
import SingleOERFlatList from "../../components/common/SingleOERFlatList";
import {
  usePostCursorByAuthor,
  usePostCursorByCategory,
  usePostCursorByGroup
} from "../../hooks/usePostCursor";
import PostsFilter from "./PostsFilter";
import UpdatedNotification from "./UpdatedNotification";

type NewsFeedType = "category" | "author" | "categoryWithGroup" | "group";

type NewsFeedProps = {
  type: NewsFeedType,
  category?: {},
  authorId?: String,
  componentRef: {},
  scrollViewProps?: {},
  isAuthorDetail: Boolean,
  shouldNavigateToNewsDetailsList?: Boolean,
  groupProps?: {
    name: String,
    image: String,
    numberPost: number
  },
  NewsFeedHeaderComponent?: React.Component
};

const NewsFeed = (props: NewsFeedProps) => {
  const {
    type,
    category,
    authorId,
    componentRef,
    scrollViewProps,
    shouldNavigateToNewsDetailsList,
    groupProps: { name },
    NewsFeedHeaderComponent,
    isAuthorDetail
  } = props;

  const [filterType, setFilterType] = useState("createdTime");
  // const [filterType, setFilterType] = useState("trending");

  const { posts, refresh, refreshing, load, loading, hide } =
    type === "group"
      ? usePostCursorByGroup(name)
      : type === "author"
      ? usePostCursorByAuthor(authorId, filterType)
      : usePostCursorByCategory(category, filterType);

  const flatListRef = useRef();
  const firstRefreshing = useRef(1);
  const updatedNotiRef = useRef();

  const scrollViewPos = useRef(new Animated.Value(0));

  useEffect(() => {
    const bottomTabSelectedListener = Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        if (selectedTabIndex === 0 && unselectedTabIndex === 0) {
          const scrollValue = scrollViewPos.current._value;
          if (scrollValue === 0) {
            refresh();
          } else {
            scrollToTop();
          }
        }
      }
    );

    return () => {
      bottomTabSelectedListener.remove();
    };
  });

  useEffect(() => {
    if (!refreshing) {
      if (firstRefreshing && firstRefreshing.current < 3) {
        firstRefreshing.current += firstRefreshing.current;
      } else {
        updatedNotiRef.current && updatedNotiRef.current.setNotiVisible();
      }
    }
  }, [refresh, refreshing]);

  if (componentRef) {
    componentRef.current = {
      scrollToTop
    };
  }

  function scrollToTop() {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: true
      });
    }
  }

  function onFilterChanged(type) {
    setFilterType(type);
  }

  function renderNews({
    item: { id, displayType, createdTime, seeMore },
    item,
    index
  }: any) {
    if (type === "group") {
      if (index === 0) {
        return <FirstItem id={id} />;
      }
      return <OtherItems id={id} />;
    }
    if (displayType === 0) {
      return (
        <CommonNewsItem
          id={id}
          type={type}
          categoryId={category.id !== "dexuat" ? category.id : null}
          createdTime={createdTime}
          hidePost={hide}
          shouldNavigateToNewsDetailsList={shouldNavigateToNewsDetailsList}
        />
      );
    }

    if (displayType === 1) {
      return (
        <SocialNewsItem
          id={id}
          type={type}
          categoryId={category.id !== "dexuat" ? category.id : null}
          createdTime={createdTime}
          seeMore={seeMore}
          hidePost={hide}
          shouldNavigateToNewsDetailsList={shouldNavigateToNewsDetailsList}
        />
      );
    }

    if (displayType === 9537) {
      return <CategorySuggestionList items={item.items} />;
    }

    if (displayType === 7749) {
      return <AuthorSuggestionList items={item.items} />;
    }

    return null;
  }

  function renderSeparator() {
    return <View cls="hg-6 bg-paleGray" />;
  }

  function onEndReached() {
    load();
  }

  const renderHeader = useMemo(
    wrap(() => {
      switch (type) {
        case "categoryWithGroup":
          return (
            <View>
              <PostsFilter onFilterChanged={onFilterChanged} />
              <NewsGroupList />
            </View>
          );
        case "author":
          return (
            <View>
              {NewsFeedHeaderComponent}
              {!isAuthorDetail ? (
                <View cls="mbn-8">
                  <PostsFilter onFilterChanged={onFilterChanged} />
                </View>
              ) : null}
            </View>
          );

        default:
          return null;
      }
    }),
    [type]
  );

  console.log("fucking here");

  return (
    <View cls="flx-i">
      <UpdatedNotification componentRef={updatedNotiRef} />
      <SingleOERFlatList
        cls="bg-paleGray"
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollViewPos.current
              }
            }
          }
        ])}
        componentRef={flatListRef}
        onRefresh={refresh}
        refreshing={refreshing}
        data={posts}
        renderItem={wrap(renderNews)}
        keyExtractor={({ id }) => `${id}`}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          !refreshing && loading ? <ActivityIndicator /> : null
        }
        ItemSeparatorComponent={wrap(renderSeparator)}
        {...scrollViewProps}
      />
    </View>
  );
};

NewsFeed.defaultProps = {
  scrollViewProps: {},
  category: {},
  authorId: "",
  shouldNavigateToNewsDetailsList: false,
  groupProps: {},
  NewsFeedHeaderComponent: <View />
};

export default memo(
  wrap(NewsFeed, "defaultProps"),
  (prevProps: NewsFeedProps, nextProps: NewsFeedProps) =>
    prevProps.scrollViewProps === nextProps.scrollViewProps
);

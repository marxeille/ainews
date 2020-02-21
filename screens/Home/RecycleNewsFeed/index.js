import React, { useRef, useEffect, memo, useState, useMemo } from "react";
import {
  View,
  ActivityIndicator,
  Animated,
  RefreshControl
} from "react-native";
import { Navigation } from "react-native-navigation";
import { wrap } from "@agiletechvn/react-theme";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";
import { connect } from "react-redux";
import { compose } from "redux";

import AuthorSuggestionList from "AINews/src/screens/Home/AuthorSuggestionList";
import CategorySuggestionList from "AINews/src/screens/Home/CategorySuggestionList";
import NewsGroupList from "AINews/src/screens/Home/NewsGroupList";

import CommonNewsItem from "../CommonNewsItem";
import SocialNewsItem from "../SocialNewsItem";
import FirstItem from "../GroupNewsItem/FirstItem";
import OtherItems from "../GroupNewsItem/OtherItems";
import {
  usePostCursorByAuthor,
  usePostCursorByCategory,
  usePostCursorByGroup
} from "../../../hooks/usePostCursor";
import PostsFilter from "../PostsFilter";
import UpdatedNotification from "../UpdatedNotification";
import ItemSeparator from "./ItemSeparator";
import { trendingGroupItemHeight, newsItemHeight } from "./config";

const ViewTypes = {
  HEADER: 0,
  ITEM: 1
};

type NewsFeedType = "category" | "author" | "categoryWithGroup" | "group";

type NewsFeedProps = {
  type: NewsFeedType,
  token?: String,
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

const RecycleNewsFeed = (props: NewsFeedProps) => {
  const {
    type,
    token,
    category,
    authorId,
    componentRef,
    scrollViewProps,
    shouldNavigateToNewsDetailsList,
    groupProps: { name },
    NewsFeedHeaderComponent
  } = props;

  // const [filterType, setFilterType] = useState("createdTime");
  const [filterType, setFilterType] = useState(
    token ? "recommend" : "trending"
  );

  const { posts, refresh, refreshing, load, loading, hide } =
    type === "group"
      ? usePostCursorByGroup(name)
      : type === "author"
      ? usePostCursorByAuthor(authorId, filterType)
      : usePostCursorByCategory(category, filterType);

  const flatListRef = useRef();
  const firstRefreshing = useRef(1);
  const updatedNotiRef = useRef();
  const groupListRef = useRef();

  const dataProvider = useRef(new DataProvider((r1, r2) => r1 !== r2));
  const layoutProvider = useRef(
    new LayoutProvider(
      index => {
        if (category.id === "dexuat") {
          if (index === 0) {
            return ViewTypes.HEADER;
          }
          return ViewTypes.ITEM;
        }

        return ViewTypes.ITEM;
      },
      (itemType, dim) => {
        dim.width = newsItemHeight;

        if (itemType === ViewTypes.HEADER) {
          dim.height = trendingGroupItemHeight + 120;
        } else {
          dim.height = newsItemHeight * 2;
        }
      }
    )
  );

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
        if (
          groupListRef &&
          groupListRef.current &&
          groupListRef.current.refreshList
        ) {
          groupListRef.current.refreshList();
        }
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
      flatListRef.current.scrollToOffset(0, 0, true);
    }
  }

  function onFilterChanged(type) {
    setFilterType(type);
  }

  function renderNews(itemType, item, index) {
    const { id, displayType, createdTime, seeMore } = item;

    if (itemType === ViewTypes.HEADER) {
      return renderHeader;
    }

    if (type === "group") {
      if (index === 0) {
        return <FirstItem id={id} />;
      }
      return <OtherItems id={id} />;
    }
    if (displayType === 0) {
      return (
        <View cls="fullWidth">
          <CommonNewsItem
            id={id}
            type={type}
            categoryId={category.id !== "dexuat" ? category.id : null}
            createdTime={createdTime}
            hidePost={hide}
            shouldNavigateToNewsDetailsList={shouldNavigateToNewsDetailsList}
          />
          <ItemSeparator />
        </View>
      );
    }

    if (displayType === 1) {
      return (
        <View cls="fullWidth">
          <SocialNewsItem
            id={id}
            type={type}
            categoryId={category.id !== "dexuat" ? category.id : null}
            createdTime={createdTime}
            seeMore={seeMore}
            hidePost={hide}
            shouldNavigateToNewsDetailsList={shouldNavigateToNewsDetailsList}
          />
          <ItemSeparator />
        </View>
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

  function onEndReached() {
    load();
  }

  function renderFooter() {
    if (!refreshing && loading) {
      return (
        <View cls="fullWidth aic jcc pv3">
          <ActivityIndicator />
        </View>
      );
    }
    return null;
  }

  const renderHeader = useMemo(
    wrap(() => {
      switch (type) {
        case "categoryWithGroup":
          return (
            <View cls="fullWidth">
              <PostsFilter onFilterChanged={onFilterChanged} />
              <NewsGroupList componentRef={groupListRef} />
            </View>
          );
        case "author":
          return (
            <View cls="fullWidth">
              {NewsFeedHeaderComponent}
              <View cls="mbn-8">
                <PostsFilter onFilterChanged={onFilterChanged} />
              </View>
            </View>
          );

        default:
          return null;
      }
    }),
    [type]
  );

  return (
    <View cls="flx-i">
      <UpdatedNotification componentRef={updatedNotiRef} />
      <RecyclerListView
        layoutProvider={layoutProvider.current}
        dataProvider={dataProvider.current.cloneWithRows(posts)}
        rowRenderer={wrap(renderNews)}
        onEndReached={onEndReached}
        onEndReachedThreshold={200}
        forceNonDeterministicRendering
        canChangeSize
        cls="bg-paleGray flx-i"
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollViewPos.current
              }
            }
          }
        ])}
        ref={flatListRef}
        renderFooter={wrap(renderFooter)}
        scrollViewProps={{
          refreshing,
          showsVerticalScrollIndicator: false,
          refreshControl: (
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          )
        }}
      >
        <View cls="hg-300 wd-300 bg-red" />
      </RecyclerListView>
    </View>
  );
};

RecycleNewsFeed.defaultProps = {
  scrollViewProps: {},
  category: {},
  authorId: "",
  shouldNavigateToNewsDetailsList: false,
  groupProps: {},
  NewsFeedHeaderComponent: <View />
};

// export default memo(
//   wrap(RecycleNewsFeed, "defaultProps"),
//   (prevProps: NewsFeedProps, nextProps: NewsFeedProps) =>
//     prevProps.scrollViewProps === nextProps.scrollViewProps
// );

const newsFeed = memo(
  wrap(RecycleNewsFeed, "defaultProps"),
  (prevProps: NewsFeedProps, nextProps: NewsFeedProps) =>
    prevProps.scrollViewProps === nextProps.scrollViewProps
);

export default compose(
  connect(state => ({
    token: state.token.token
  }))
)(newsFeed);

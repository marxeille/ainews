/* eslint-disable react/prop-types */
import React from 'react';
import { wrap } from '@agiletechvn/react-theme';
import { View, StatusBar, Platform, Text, FlatList } from 'react-native';
import { searchPosts, searchUsers } from 'AINews/src/store/APIs/search';
import { Navigation } from 'react-native-navigation';
import HomeSearchHeader from './HomeSearchHeader';
import HomeSearchPost from './HomeSearchPost';
import HomeSearchUser from './HomeSearchUser';

const setStatusBar = () => {
  if (Platform.OS === 'ios') {
    // StatusBar.setBarStyle('default', true);
  } else {
    // StatusBar.setBackgroundColor('white');
    // StatusBar.setBarStyle('dark-content', true);
  }
};

const ListFooterComponent = wrap(() => (
  <View cls="flx-row aic jcc mt2 bg-white brs-4 pv2">
    <Text cls="ff-sf fw5">----------- Cuối kết quả tìm kiếm -----------</Text>
  </View>
));

class SearchByType extends React.Component {
  static options = {
    topBar: {
      height: 0,
      visible: false
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingMore: false,
      items: null
    };
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
    clearTimeout(this.timer);
  }

  componentDidAppear() {
    setStatusBar();
  }

  onChange = key => {
    clearTimeout(this.timer);
    this.key = key;
    this.timer = setTimeout(() => {
      this.loadResult({ reload: true });
    }, 500);
  };

  onRefresh = () => this.loadResult({ reload: true });

  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };

  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.loadResult({ reload: false });
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  setResult = ({ result, reload }) => {
    const { items } = this.state;
    // reload
    if (!items || reload) {
      const newItems = [...result.data.items];
      this.setState({ items: [...result.data.items], isLoading: false });
      if (newItems.length >= result.total_record) {
        this.cantLoadMore = true;
      }
    } else {
      // loadmore
      const newItems = [...items, ...result.data.items];
      this.setState({ items: [...newItems], isLoadingMore: false });
      if (newItems.length >= result.total_record) {
        this.cantLoadMore = true;
      }
    }
  };

  loadResult = async ({ reload }) => {
    try {
      if (this.cantLoadMore) return;
      const { searchType } = this.props;
      // check if reload reassign page to 1
      if (reload) {
        this.size = 10;
        this.page = 1;
      } else {
        this.page = this.page + 1;
      }

      if (reload) {
        this.setState({ isLoading: true, error: null, items: null });
      } else {
        this.setState({ isLoadingMore: true, error: null });
      }

      let result;
      if (searchType === 1) {
        result = await searchUsers({
          key: this.key,
          page: this.page,
          size: this.size
        });
      } else if (searchType === 2) {
        result = await searchPosts({
          key: this.key,
          page: this.page,
          size: this.size
        });
      }

      this.setResult({ reload, result });
    } catch (error) {
      this.setState({ isLoading: false, error, isLoadingMore: false });
    }
  };

  onHidePost = postId => {
    const { items } = this.state;
    const newPostList = items.filter(post => post.id !== postId);

    this.setState({
      items: newPostList
    });
  };

  keyExtractor = item => `${item.id}`;

  renderItem = ({ item, index }) => {
    const { searchType } = this.props;
    const { items } = this.state;

    switch (searchType) {
      case 1:
        return (
          <HomeSearchUser
            containerCls={['bg-white ph3', { pb3: items.length - 1 === index }]}
            item={item}
            index={index}
            length={items.length}
          />
        );
      case 2:
        return (
          <HomeSearchPost
            item={item}
            index={index}
            length={items.length}
            onHidePost={this.onHidePost}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { searchKey } = this.props;
    const { items, isLoading, isLoadingMore, total_record } = this.state;

    return (
      <View cls="flx-i">
        <HomeSearchHeader onChange={this.onChange} searchKey={searchKey} />
        <View cls="flx-i bg-paleGray">
          <View cls="flx-i">
            <FlatList
              showsVerticalScrollIndicator={false}
              onRefresh={this.onEndReached}
              refreshing={isLoading}
              data={items}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              onMomentumScrollBegin={this.onMomentumScrollBegin}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                total_record
                && items
                && total_record === items.length && <ListFooterComponent />
              }
            />
          </View>
          {isLoadingMore && (
            <View cls="flx-row hg-32 jcc aic mbx">
              <Text cls="ff-sf fs-12">Đang tải thêm...</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const HomeSearchByType = wrap(SearchByType);

export default HomeSearchByType;

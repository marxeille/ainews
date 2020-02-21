/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { wrap } from '@agiletechvn/react-theme';
import { search } from 'AINews/src/store/APIs/search';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import Bootstrap from '../../App/Bootstrap';
import HomeSearchHeader from './HomeSearchHeader';
import HomeSearchUser from './HomeSearchUser';
import HomeSearchPost from './HomeSearchPost';

const setStatusBar = () => {
  if (Platform.OS === 'ios') {
    // StatusBar.setBarStyle('dark-content', true);
  } else {
    // StatusBar.setBackgroundColor('white');
    // StatusBar.setBarStyle('dark-content', true);
  }
};

class Search extends React.Component {
  static options = {
    topBar: {
      height: 0,
      visible: false
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      result: null,
      posts: []
    };
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
      this.loadResult();
    }, 500);
  };

  loadResult = async () => {
    try {
      this.setState({ isLoading: true, error: null, result: null });
      const result = await search({
        key: this.key
      });
      this.setState({
        isLoading: false,
        result: result && result.data,
        posts: (result && result.data && result.data.posts.items) || []
      });
    } catch (error) {
      this.setState({ isLoading: false, error });
    }
  };

  onSeeAllPeople = () => {
    Bootstrap.push({
      component: {
        name: 'HomeSearchByType',
        passProps: {
          searchKey: this.key,
          searchType: 1
        }
      }
    });
  };

  onSeeAllPosts = () => {
    Bootstrap.push({
      component: {
        name: 'HomeSearchByType',
        passProps: {
          searchKey: this.key,
          searchType: 2
        }
      }
    });
  };

  onHidePost = postId => {
    const { posts } = this.state;
    const newPostList = posts.filter(post => post.id !== postId);

    this.setState({
      posts: newPostList
    });
  };

  render() {
    const { isLoading, result, posts } = this.state;
    let notHaveItem = true;
    if (
      result
      && result.users
      && result.users.items
      && result.users.items.length > 0
      && result.posts
      && result.posts.items
      && result.posts.items.length > 0
    ) {
      notHaveItem = false;
    }

    return (
      <View cls="flx-i">
        <HomeSearchHeader
          onChange={this.onChange}
          searchKey={this.props.searchKey}
        />
        <View cls="flx-i mt2 bg-paleGray">
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={(
              <RefreshControl
                refreshing={isLoading}
                onRefresh={this.loadResult}
              />
)}
          >
            {result
              && result.users
              && result.users.items
              && result.users.items.length > 0 && (
                <View cls="brs-4 bg-white mt2 mh2 pa3">
                  <Text cls="fs-18 ff-sf fw6">Mọi người</Text>
                  {result.users.items.map((item, index) => (
                    <HomeSearchUser
                      item={item}
                      key={item.id}
                      index={index}
                      length={result.users.items.length}
                    />
                  ))}
                  {result.users.total_record > 3 && (
                    <DebounceTouch
                      cls="flx-row bg-empty brs-3 ph2 pv2 aic jcc mt3"
                      onPress={this.onSeeAllPeople}
                    >
                      <Text cls="ff-sf fw5">Xem tất cả</Text>
                    </DebounceTouch>
                  )}
                </View>
            )}
            {result
              && result.posts
              && result.posts.items
              && result.posts.items.length > 0 && (
                <View cls="mt2">
                  {posts.map((item, index) => (
                    <HomeSearchPost
                      item={item}
                      key={item.id}
                      index={index}
                      length={result.users.items.length}
                      onHidePost={this.onHidePost}
                    />
                  ))}
                  {result.posts.total_record > 10 && (
                    <DebounceTouch
                      cls="flx-row bg-white brs-3 ph2 pv2 aic jcc mt3 mh2 mb2"
                      onPress={this.onSeeAllPosts}
                    >
                      <Text cls="ff-sf fw5">Xem tất cả</Text>
                    </DebounceTouch>
                  )}
                </View>
            )}
            {!isLoading && notHaveItem && (
              <View cls="jcc aic flx-row mt2">
                <Text cls="ff-sf fw4 fs-16">Không tìm thấy kết quả nào</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const HomeSearch = wrap(Search);

export default HomeSearch;

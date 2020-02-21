/* eslint-disable react/prop-types */
import React from 'react';
import SortableListView from 'react-native-sortable-listview';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import { wrap } from '@agiletechvn/react-theme';
import {
  getCategories,
  getCategoriesWithoutSync,
  saveCategories
} from 'AINews/src/store/actions/categories';
import { updateCategories } from 'AINews/src/store/actions/user';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { t } from 'AINews/src/utils/LocalizationUtils';
import Bootstrap from 'AINews/src/App/Bootstrap';
import CategoryConfigurationHeader from './Header';
import images from '../../../../assets/images';
import colors from '../../../themes/colors';
import CategoryItem from './CategoryItem';

class CategoryConfiguration extends React.Component {
  static options() {
    return {
      topBar: {
        visible: true,
        title: {
          text: 'Chủ đề yêu thích'
        },
        backButton: {
          icon: images.back,
          color: colors.commonGrey
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.categoriesFollowingResult = null;
  }

  componentDidMount = async () => {
    const loggedIn = !!this.props.token;

    try {
      const result = await callSagaRequest(
        loggedIn ? getCategories : getCategoriesWithoutSync
      );
      const { categories } = this.props;
      this.categoriesFollowingResult = result;
      let data = [...result];

      const selectedOrder = [];
      const unselectedOrder = [];

      if (!loggedIn) {
        data = data.map(item => {
          if (categories.find(category => category.id === item.id)) {
            return {
              ...item,
              followed: 1
            };
          }

          return item;
        });
      }

      categories.forEach(category => {
        const foundIndex = _.findIndex(
          data,
          receivedData => category.id === receivedData.id
        );
        if (foundIndex > -1) {
          selectedOrder.push(foundIndex);
        }
      });
      data.forEach((item, index) => {
        if (!categories.find(category => category.id === item.id)) {
          unselectedOrder.push(index);
        }
      });

      const order = [...selectedOrder, ...unselectedOrder];
      this.setState({ isLoading: false, data, order });
    } catch (err) {
      this.setState({ isLoading: false, err });
    }
  };

  renderHeader = wrap(() => (
    <View cls="ph3 ff-sf fw5">
      <CategoryConfigurationHeader />
    </View>
  ));

  onItemPress = item => {
    const itemIndex = this.state.data.findIndex(
      dataItem => dataItem.id === item.id
    );

    this.setState(prevState => ({
      data: [
        ...prevState.data.slice(0, itemIndex),
        {
          ...prevState.data[itemIndex],
          followed: !prevState.data[itemIndex].followed
        },
        ...prevState.data.slice(itemIndex + 1)
      ]
    }));
  };

  onUpdateCategoriesPress = async () => {
    const selectedCategories = [
      { id: 'dexuat', name: 'Đề xuất' },
      ...this.state.order
        .filter(index => this.state.data[index].followed)
        .map(value => ({
          id: this.state.data[value].id,
          name: this.state.data[value].name
        }))
    ];

    if (
      JSON.stringify(this.props.categories)
      === JSON.stringify(selectedCategories)
    ) {
      await Bootstrap.pop();
      return;
    }

    if (selectedCategories.length < 2) {
      Alert.alert(
        t('categoryConfiguration.updateErrorTitle'),
        t('categoryConfiguration.updateAtLeastOneCategoryErrorDescription')
      );
      return;
    }

    if (!this.props.token) {
      this.props.saveCategories(selectedCategories);
      Bootstrap.pop();
      return;
    }

    let loadingOverlayId;
    try {
      loadingOverlayId = await Bootstrap.showLoadingOverlay(
        t('categoryConfiguration.updating')
      );

      selectedCategories.shift();

      const updatedCategories = selectedCategories.map(item => item.id);

      await callSagaRequest(updateCategories, {
        updatedCategories
      });
      await Bootstrap.dismissLoadingOverlay(loadingOverlayId);
      selectedCategories.unshift({
        id: 'dexuat',
        name: 'Đề xuất'
      });

      // A trick here to re-render tabbar correctly
      this.props.saveCategories([{ id: 'dexuat', name: 'Đề xuất' }]);
      this.props.saveCategories(selectedCategories);
      await Bootstrap.pop();
    } catch (err) {
      await Bootstrap.dismissLoadingOverlay(loadingOverlayId);

      Alert.alert(
        t('categoryConfiguration.updateErrorTitle'),
        t('categoryConfiguration.updateRequestErrorDescription')
      );
    }
  };

  rowHasChange = (nextProps, prevProps) => {
    if (nextProps.item && prevProps.item) {
      return nextProps.item.followed !== prevProps.item.followed;
    }
    return false;
  };

  renderRow = row => <CategoryItem item={row} onItemPress={this.onItemPress} />;

  render() {
    const { data, isLoading } = this.state;

    if (isLoading) {
      return (
        <View cls="flx-row jcc hg-36">
          <ActivityIndicator size="small" />
        </View>
      );
    }

    if (!data) {
      return null;
    }

    return (
      <View cls="flx-i">
        <View cls="flx-i">
          {this.renderHeader()}
          <SortableListView
            removeClippedSubviews={false}
            disableAnimatedScrolling
            activeOpacity={0.8}
            cls="flx-i mb0"
            data={this.state.data}
            order={this.state.order}
            showsVerticalScrollIndicator={false}
            rowHasChanged={this.rowHasChange}
            onRowMoved={e => {
              this.state.order.splice(
                e.to,
                0,
                this.state.order.splice(e.from, 1)[0]
              );
              this.forceUpdate();
            }}
            limitScrolling
            renderRow={this.renderRow}
          />
        </View>
        <View cls="aic jcc ph3 pv3">
          <TouchableOpacity
            cls="bg-reddish pv3 fullWidth br2 aic jcc"
            onPress={this.onUpdateCategoriesPress}
          >
            <Text cls="white fs-16">{t('categoryConfiguration.update')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default compose(
  connect(
    state => ({
      categories: state.categories.categories,
      token: state.token.token
    }),
    {
      saveCategories
    }
  ),
  wrap
)(CategoryConfiguration);

/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { wrap, sizes } from '@agiletechvn/react-theme';
import { WINDOW_WIDTH } from 'AINews/src/utils/trivia';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';
import images from 'AINews/assets/images';

type Props = {
  categories: [],
  item: {},
  followed: Number
};

class CategoryItem extends React.Component<Props> {
  constructor(props) {
    super(props);
    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            }
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10]
          })
        },

        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07]
              })
            }
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6]
          })
        }
      })
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.item.followed !== this.props.item.followed;
  }

  onItemPress = () => this.props.onItemPress && this.props.onItemPress(this.props.item);

  render() {
    const { item } = this.props;

    return (
      <TouchableWithoutFeedback
        cls="jcc aic"
        {...this.props.sortHandlers}
        onPress={this.onItemPress}
      >
        <Animated.View style={[styles.row, this._style]}>
          <View cls="pr3 pv2">
            <View cls="sz-40 br2 oh">
              <ImageWithPlaceholder
                cls="fullView"
                source={{ uri: item?.image || null }}
              />
            </View>
          </View>
          <View cls="flx-i">
            <View cls="flx-row jcsb hg-60 aic">
              <View cls="jcc">
                <Text cls="fs-15 commonBlack">{item.name}</Text>
              </View>
              <View cls="flx-row aic">
                <TouchableOpacity
                  cls={`mr3 circleFn-24 ${
                    this.props.item.followed ? 'bg-reddish' : 'ba b--commonGrey'
                  }`}
                  onPress={this.onItemPress}
                />
                <Image source={images.sort} />
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        width: WINDOW_WIDTH - 32,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2
      },

      android: {
        width: WINDOW_WIDTH - 32,
        elevation: 0,
        marginHorizontal: 30
      }
    })
  }
});

export default compose(
  connect(state => ({
    categories: state.categories.categories
  })),
  wrap
)(CategoryItem);

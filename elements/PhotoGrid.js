import React, { PureComponent } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ViewStyle,
  ImageStyle,
  TextStyle,
  StyleSheet
} from 'react-native';
import { WINDOW_WIDTH } from '../utils/trivia';
import ImageWithPlaceholder from './ImageWithPlaceholder';
import colors from '../themes/colors';
import DebounceTouch from '../components/common/DebounceTouch';

type Props = {
  source: [String],
  numberImagesToShow?: number,
  onPressImage?: Function,
  style?: ViewStyle,
  imageStyle?: ImageStyle,
  imageProps?: {},
  textStyles?: TextStyle,
  width?: number,
  height?: number,
  ratio?: number,
  gap?: number
};

class PhotoGrid extends PureComponent<Props> {
  isLastImage = (index, secondViewImages) => {
    const { source, numberImagesToShow } = this.props;

    return (
      (source.length > 5 || numberImagesToShow)
      && index === secondViewImages.length - 1
    );
  };

  handlePressImage = (event, { image, index }, secondViewImages) => this.props.onPressImage({ image, index });

  render() {
    const { imageProps, gap } = this.props;
    const source = this.props.source.slice(0, 5);
    const firstViewImages = [];
    const secondViewImages = [];
    const firstItemCount = source.length === 5 ? 2 : 1;
    let index = 0;
    source.forEach(image => {
      if (index === 0) {
        firstViewImages.push(image);
      } else if (index === 1 && firstItemCount === 2) {
        firstViewImages.push(image);
      } else {
        secondViewImages.push(image);
      }
      index += 1;
    });

    const { width, height } = this.props;
    let imageRatio = 0;
    if (secondViewImages.length === 0) {
      imageRatio = 0;
    } else if (secondViewImages.length === 1) {
      imageRatio = 1 / 2;
    } else {
      imageRatio = this.props.ratio;
    }
    const direction = source.length === 5 ? 'row' : 'column';

    // const firstImageWidth = direction === 'column'
    //   ? width / firstViewImages.length
    //   : width * (1 - imageRatio);
    // const firstImageHeight = direction === 'column'
    //   ? height * (1 - imageRatio)
    //   : height / firstViewImages.length;

    // const secondImageWidth = direction === 'column'
    //   ? width / secondViewImages.length
    //   : width * imageRatio;
    // const secondImageHeight = direction === 'column'
    //   ? height / secondViewImages.length
    //   : height * imageRatio;

    const secondViewWidth = direction === 'column' ? width : width * imageRatio;
    const secondViewHeight = direction === 'column' ? height * imageRatio : height;

    return source.length ? (
      <View
        style={[{ flexDirection: direction, width, height }, this.props.style]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: direction === 'row' ? 'column' : 'row'
          }}
        >
          {firstViewImages.map((image, idx) => (
            <View
              style={{
                flex: 1,
                paddingBottom:
                  direction === 'column'
                    ? gap
                    : idx < firstViewImages.length - 1
                      ? gap
                      : 0,
                paddingTop: idx > 0 ? gap : 0,
                paddingRight: direction === 'row' ? gap : 0
              }}
              key={idx}
            >
              <DebounceTouch
                activeOpacity={0.7}
                style={{ flex: 1 }}
                onPress={event => this.handlePressImage(event, { image })}
              >
                <ImageWithPlaceholder
                  style={[
                    styles.image,
                    {
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: colors.empty
                    },
                    { flex: 1 },
                    // { width: firstImageWidth, height: firstImageHeight },
                    this.props.imageStyle
                  ]}
                  source={typeof image === 'string' ? { uri: image } : image}
                  {...imageProps}
                />
              </DebounceTouch>
            </View>
          ))}
        </View>
        {secondViewImages.length ? (
          <View
            style={{
              width: secondViewWidth,
              height: secondViewHeight,
              flexDirection: direction === 'row' ? 'column' : 'row',
              paddingLeft: direction === 'row' ? gap : 0
            }}
          >
            {secondViewImages.map((image, idx) => (
              <View
                style={{
                  flex: 1,
                  paddingBottom:
                    direction === 'row' && idx < secondViewImages.length - 1
                      ? gap
                      : 0,
                  paddingTop: direction === 'column' ? gap : idx > 0 ? gap : 0,
                  paddingLeft: direction === 'column' && idx > 0 ? gap : 0,
                  paddingRight:
                    direction === 'column' && idx < secondViewImages.length - 1
                      ? gap
                      : 0
                }}
                key={idx}
              >
                <DebounceTouch
                  activeOpacity={0.7}
                  style={{ flex: 1 }}
                  onPress={event => this.handlePressImage(
                    event,
                    { image, index: idx },
                    secondViewImages
                  )
                  }
                >
                  {this.isLastImage(idx, secondViewImages) ? (
                    <ImageBackground
                      style={[
                        styles.image,
                        { flex: 1 },
                        // { width: secondImageWidth, height: secondImageHeight },
                        {
                          borderWidth: StyleSheet.hairlineWidth,
                          borderColor: colors.empty
                        },
                        this.props.imageStyle
                      ]}
                      source={
                        typeof image === 'string' ? { uri: image } : image
                      }
                    >
                      <View style={styles.lastWrapper}>
                        <Text style={[styles.textCount, this.props.textStyles]}>
                          +
                          {this.props.numberImagesToShow
                            || this.props.source.length - 5}
                        </Text>
                      </View>
                    </ImageBackground>
                  ) : (
                    <ImageWithPlaceholder
                      style={[
                        styles.image,
                        { flex: 1 },
                        // { width: secondImageWidth, height: secondImageHeight },
                        {
                          borderWidth: StyleSheet.hairlineWidth,
                          borderColor: colors.empty
                        },
                        this.props.imageStyle
                      ]}
                      source={
                        typeof image === 'string' ? { uri: image } : image
                      }
                      {...imageProps}
                    />
                  )}
                </DebounceTouch>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    ) : null;
  }
}

PhotoGrid.defaultProps = {
  style: {},
  imageStyle: {},
  imageProps: {},
  textStyles: {},
  height: 400,
  width: WINDOW_WIDTH,
  ratio: 0.33,
  numberImagesToShow: 0,
  onPressImage: () => {},
  gap: 2
};

const styles = {
  image: {
    flex: 1,
    borderColor: colors.empty
  },
  lastWrapper: {
    flex: 1,
    backgroundColor: 'rgba(200, 200, 200, .5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCount: {
    color: '#fff',
    fontSize: 40
  }
};

export default PhotoGrid;

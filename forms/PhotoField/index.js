import React from 'react';
import { View, Image, Platform } from 'react-native';
import ImagePicker from 'AINews/src/components/ImagePicker';
import { wrap } from '@agiletechvn/react-theme';
import ImageWithPlaceholder from 'AINews/src/elements/ImageWithPlaceholder';

import images from '../../../assets/images';

@wrap
export default class PhotoField extends React.PureComponent {
  getSource = (input, defaultImage) => {
    if (
      input.value === ''
      || (input.value && input.value.uri && input.value.uri === '')
    ) {
      return defaultImage;
    }
    if (!input.value.uri) {
      return defaultImage;
    }

    return { uri: input.value.uri };
  };

  render() {
    const {
      input,
      meta: { active, touched, error, warning },
      style,
      noPhotoChooser,
      iconStyle,
      iconContainerStyle,
      editable,
      imageContainerStyle,
      onSuccess,
      resizeMode = 'stretch',
      square,
      circle,
      background,
      defaultImage = images.noCover,
      onlyCamera = false
    } = this.props;
    return (
      <View
        cls={['aic jcc oh', `${square ? `sz-${square || '90'}` : ''}`]}
        style={[style]}
      >
        <ImageWithPlaceholder
          source={this.getSource(input, defaultImage)}
          width={circle || 44}
          height={circle || 44}
          brs={circle ? circle / 2 : 22}
          defaultImage={images.noAvatar}
          resizeMode="center"
          cls="bg-white b--empty bwh"
        />

        {!noPhotoChooser ? (
          <ImagePicker
            noPicker={editable}
            cls="absolute aic jcc fullView"
            style={{
              ...Platform.select({
                android: {
                  elevation: 3
                }
              })
            }}
            iconCls=""
            iconContainerStyle={[iconContainerStyle]}
            iconStyle={[iconStyle]}
            onSuccess={response => {
              if (onSuccess) {
                onSuccess(response);
              } else input.onChange(response);
            }}
            onlyCamera={onlyCamera}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

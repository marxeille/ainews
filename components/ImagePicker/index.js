import React, { PureComponent } from 'react';
import {
  View,
  TextStyle,
  ImageStyle,
  ViewStyle
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { wrap } from '@agiletechvn/react-theme';
import ImageButton from 'AINews/src/elements/ImageButton';
import { t } from 'AINews/src/utils/LocalizationUtils';
import images from 'AINews/assets/images';
import DebounceTouch from '../common/DebounceTouch';

const options = () => ({
  title: t('setting.imagePicker.title'),
  cancelButtonTitle: t('setting.imagePicker.cancelButtonTitle'),
  takePhotoButtonTitle: t('setting.imagePicker.takePhotoButtonTitle'),
  chooseFromLibraryButtonTitle: t(
    'setting.imagePicker.chooseFromLibraryButtonTitle'
  ),
  quality: 0.6,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
});

type Props = {
  onlyCamera: Boolean,
  onSuccess: Function,
  onCancel: Function,
  onError: Function,
  onCustomButton: Function,
  style: TextStyle,
  iconContainerStyle: ViewStyle,
  iconStyle: ImageStyle,
  noPicker: Boolean
};

@wrap
export default class PhotoChooser extends PureComponent<Props> {
  _handleImagePickerOpen = () => {
    const { onlyCamera, onSuccess } = this.props;

    if (!onSuccess) return;
    if (onlyCamera) {
      ImagePicker.launchCamera(options(), response => this.resolveResponse(response));
      return;
    }
    ImagePicker.showImagePicker(options(), (response) => {
      this.resolveResponse(response);
    });
  };

  resolveResponse = (response) => {
    const {
      onCancel, onError, onCustomButton, onSuccess
    } = this.props;

    if (response.didCancel) {
      onCancel && onCancel();
    } else if (response.error) {
      onError && onError(response.error);
    } else if (response.customButton) {
      onCustomButton && onCustomButton(response.customButton);
    } else {
      onSuccess && onSuccess(response);
    }
  };

  render() {
    const {
      style,
      iconContainerStyle,
      iconStyle,
      noPicker,
      ...props
    } = this.props;
    return (
      <DebounceTouch
        cls="bgc-transparent bg-blue"
        style={[style]}
        {...props}
        onPress={this._handleImagePickerOpen}
      >
        {!noPicker ? (
          <View cls="" style={[iconContainerStyle]}>
            <ImageButton
              image={images.camera}
              width={14}
              height={12}
              callback={this._handleImagePickerOpen}
            />
          </View>
        ) : null}
      </DebounceTouch>
    );
  }
}

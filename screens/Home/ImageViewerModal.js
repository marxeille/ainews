import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { wrap } from '@agiletechvn/react-theme';
import {
  View,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
  CameraRoll,
  Platform,
  PermissionsAndroid,
  Alert
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import ImageButton from 'AINews/src/elements/ImageButton';
import colors from 'AINews/src/themes/colors';

import { t } from 'AINews/src/utils/LocalizationUtils';
import images from 'AINews/assets/images';

type Props = {
  featureImages: [],
  visible: boolean,
  initialImageIndex: Number,
  onCancel: Function,
  onRequestClose: Function
};

const ImageViewerModal = (props: Props) => {
  const {
    featureImages,
    visible,
    initialImageIndex,
    onCancel,
    onRequestClose
  } = props;

  const currentImageIndex = useRef();

  const imageViewerRef = useRef();
  const actionSheetRef = useRef();

  const imageUrls = useMemo(
    () =>
      featureImages.map(image => ({
        url: image
      })),
    [featureImages]
  );

  useEffect(() => {
    currentImageIndex.current = initialImageIndex;
  }, [initialImageIndex]);

  function onEllipsisPress() {
    actionSheetRef.current?.show();
  }

  function onImageViewerChange(index) {
    currentImageIndex.current = index;
  }

  const renderImageViewerHeader = useCallback(
    wrap(() => (
      <View cls="absolute-fill hg-56 aic phn-12 z-1 flx-row jcsb">
        <TouchableWithoutFeedback onPress={onCancel}>
          <Ionicons name="md-close" size={32} color={colors.brandWhite} />
        </TouchableWithoutFeedback>
        <ImageButton
          image={images.report}
          width={28}
          height={24}
          callback={onEllipsisPress}
        />
      </View>
    )),
    []
  );

  async function onEllipsisItemSelect(index) {
    if (index === 0) {
      if (currentImageIndex === 0 || currentImageIndex) {
        const imageIndex = currentImageIndex.current;
        if (imageIndex === 0 || imageIndex) {
          const image = featureImages[imageIndex];
          try {
            if (Platform.OS === 'android') {
              const permission =
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
              const result = await PermissionsAndroid.request(permission);
              if (result === 'granted') {
                const res = await RNFetchBlob.config({
                  fileCache: true,
                  appendExt: 'jpg'
                }).fetch('GET', image);
                if (res) {
                  await CameraRoll.saveToCameraRoll(
                    `file://${res.path()}`,
                    'photo'
                  );
                }
              }
            } else {
              await CameraRoll.saveToCameraRoll(image, 'photo');
            }
          } catch (err) {
            Alert.alert(
              t('photoListDetails.saveImageErrorTitle'),
              t('photoListDetails.saveImageErrorContent')
            );
          }
        }
      }
    }
  }

  function renderImageViewer() {
    return (
      <Modal visible={visible} transparent onRequestClose={onRequestClose}>
        <ImageViewer
          onChange={onImageViewerChange}
          ref={imageViewerRef}
          imageUrls={imageUrls}
          enablePreload
          enableImageZoom
          enableSwipeDown
          onCancel={onCancel}
          index={initialImageIndex}
          renderHeader={renderImageViewerHeader}
          renderIndicator={() => null}
          loadingRender={() => <ActivityIndicator />}
          swipeDownThreshold={0.9}
        />
      </Modal>
    );
  }

  function renderModal() {
    return (
      <ActionSheet
        ref={actionSheetRef}
        options={[
          t('photoListDetails.save'),
          t('common.share'),
          t('common.close')
        ]}
        cancelButtonIndex={2}
        onPress={onEllipsisItemSelect}
      />
    );
  }

  return (
    <View>
      {renderImageViewer()}
      {renderModal()}
    </View>
  );
};

export default ImageViewerModal;

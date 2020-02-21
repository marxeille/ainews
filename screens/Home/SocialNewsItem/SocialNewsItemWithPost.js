import React, { memo, useState } from 'react';
import { View, Text, LayoutAnimation } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import { getTrimmedString } from 'AINews/src/utils/trivia';
import TextButton from 'AINews/src/elements/TextButton';
import ImageViewerModal from 'AINews/src/screens/Home/ImageViewerModal';
import PhotoGrid from '../../../elements/PhotoGrid';
import NewsInteractiveSection from '../NewsInteractiveSection';
import { t } from '../../../utils/LocalizationUtils';
import NewsAuthorSection from '../NewsAuthorSection';
import Bootstrap from '../../../App/Bootstrap';

type Props = {
  id: String,
  type: String,
  categoryId?: String,
  seeMore?: Boolean,
  isUsedInNewsDetails?: boolean,
  isUsedInPhotoListDetailts?: boolean,
  createdTime: Number,
  hidePost: Function,
  post: {},
  postDetails: {},
  shouldNavigateToNewsDetailsList?: Boolean,
  shouldShowAuthor?: Boolean
};

const SHORT_CONTENT_LENGTH = 200;

const SocialNewsItemWithPost = (props: Props) => {
  const {
    id,
    type,
    categoryId,
    seeMore,
    isUsedInNewsDetails,
    isUsedInPhotoListDetailts,
    createdTime,
    hidePost,
    post,
    postDetails,
    shouldNavigateToNewsDetailsList,
    shouldShowAuthor
  } = props;

  const { shortContent, featureImages, createdAt, author, saved } = post;
  const [expanding, setExpanding] = useState(false);
  const [visible, setVisible] = useState(false);

  function onReadMoreToggled() {
    LayoutAnimation.configureNext({
      duration: 400,
      create: { type: 'linear', property: 'opacity' },
      update: { type: 'spring', springDamping: 0.5 },
      delete: { type: 'linear', property: 'opacity' }
    });
    setExpanding(_expanding => !_expanding);
  }

  function onNewsDetailsShouldDisplay(autoShowKeyboard) {
    if (isUsedInNewsDetails) {
      return;
    }

    if (shouldNavigateToNewsDetailsList) {
      Bootstrap.push({
        component: {
          name: 'NewsDetailsList',
          passProps: {
            id,
            initialPostDisplayType: 1,
            initialLastId: createdTime,
            filters: {
              categoryId
            }
          }
        }
      });
    } else {
      Bootstrap.push({
        component: {
          name: 'LinkedNewsDetails',
          passProps: {
            id,
            autoShowKeyboard,
            hidePost,
            shouldLoadFullContent: true
          }
        }
      });
    }
  }

  function renderContentInDetails() {
    return (
      <View cls="phn-12">
        <Text cls="fs-14 fw3 ff-sf commonBlack">{postDetails?.content}</Text>
      </View>
    );
  }

  function onReadDetailsPress() {
    onNewsDetailsShouldDisplay(true);
  }

  function renderContentInFeed() {
    if (shortContent.length <= SHORT_CONTENT_LENGTH) {
      return (
        <DebounceTouch activeOpacity={1.0} onPress={onReadDetailsPress}>
          <View cls="phn-12">
            <Text cls="fs-14 fw3 ff-sf commonBlack">{shortContent}</Text>
          </View>
        </DebounceTouch>
      );
    }

    if (expanding) {
      return (
        <DebounceTouch activeOpacity={1.0} onPress={onReadMoreToggled}>
          <View cls="phn-12">
            <Text cls="fs-14 fw3 ff-sf commonBlack">
              {`${shortContent}${seeMore ? '...' : ''}`}
            </Text>
            {seeMore ? (
              <TextButton
                label={t('common.readDetails')}
                textCls="fs-14 fw3 ff-sf blue"
                callback={onReadDetailsPress}
              />
            ) : null}
          </View>
        </DebounceTouch>
      );
    }
    return (
      <DebounceTouch activeOpacity={1.0} onPress={onReadMoreToggled}>
        <View cls="phn-12">
          <Text cls="fs-14 fw3 ff-sf commonBlack">
            {`${getTrimmedString(shortContent, SHORT_CONTENT_LENGTH)}...`}
          </Text>
          <Text cls="fs-14 fw3 ff-sf blue">{t('common.readMore')}</Text>
        </View>
      </DebounceTouch>
    );
  }

  function onPressImage({ index }) {
    if (featureImages.length > 1) {
      Bootstrap.push({
        component: {
          name: 'PhotoListDetails',
          passProps: {
            id,
            featureImages,
            initialIndex: index
          }
        }
      });
    } else {
      setVisible(true);
    }
  }

  function onImageViewerModalCancel() {
    setVisible(false);
  }

  return (
    <View cls="bg-white">
      {shouldShowAuthor ? (
        <NewsAuthorSection
          saved={saved}
          postId={id}
          author={author}
          createdAt={createdAt}
          type={type}
          hidePost={hidePost}
          inDetailsScreen
        />
      ) : null}

      {isUsedInNewsDetails ? renderContentInDetails() : renderContentInFeed()}
      <View cls="hg-15" />
      {isUsedInPhotoListDetailts ? null : (
        <PhotoGrid onPressImage={onPressImage} source={featureImages} />
      )}
      <View cls="hg-10" />
      <View cls="hg-1 bg-newsSeparatingLine mhn-10" />
      <NewsInteractiveSection
        id={id}
        onNewsDetailsShouldDisplay={onReadDetailsPress}
      />
      <ImageViewerModal
        featureImages={featureImages}
        visible={visible}
        initialImageIndex={0}
        onCancel={onImageViewerModalCancel}
        onRequestClose={onImageViewerModalCancel}
      />
    </View>
  );
};

SocialNewsItemWithPost.defaultProps = {
  categoryId: null,
  seeMore: false,
  isUsedInNewsDetails: false,
  isUsedInPhotoListDetailts: false,
  shouldNavigateToNewsDetailsList: false,
  shouldShowAuthor: true
};

export default memo(
  wrap(SocialNewsItemWithPost, 'defaultProps'),
  (prevProps: Props, nextProps: Props) => prevProps.id === nextProps.id
    && prevProps.postDetails === nextProps.postDetails
    && prevProps.post === nextProps.post
);

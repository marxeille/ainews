import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, ActivityIndicator, Text, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { wrap } from '@agiletechvn/react-theme';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { getPostDetails } from 'AINews/src/store/actions/posts';
import CommonNewsDetails from 'AINews/src/screens/Home/CommonNewsItem/CommonNewsDetails';
import SocialNewsDetails from 'AINews/src/screens/Home/SocialNewsItem/SocialNewsDetails';
import { t } from 'AINews/src/utils/LocalizationUtils';
import colors from 'AINews/src/themes/colors';
import images from 'AINews/assets/images';

type Props = {
  id: String,
  componentId: String,
  hidePost: Function
};

const LinkedNewsDetails = wrap((props: Props) => {
  const { id, componentId, hidePost } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [detailsType, setDetailsType] = useState();
  const headerType = useRef('back');

  useEffect(() => {
    (async () => {
      try {
        const result = await callSagaRequest(getPostDetails, { id });
        const { displayType } = result;
        setDetailsType(() => displayType);
      } catch (err) {
        console.log('LinkedNewDetails/load error', err);
        setError(true);
      } finally {
        setLoading(() => false);
      }
    })();
  }, [id]);

  const setAuthorHeader = useCallback(
    post => {
      if (headerType.current !== 'author') {
        Navigation.mergeOptions(componentId, {
          topBar: {
            title: {
              ...Platform.select({
                ios: {
                  component: {
                    name: 'NewsDetailHeader',
                    alignment: 'center',
                    passProps: {
                      post
                    }
                  }
                },
                android: {
                  text: post.title
                }
              })
            }
          }
        });
        headerType.current = 'author';
      }
    },
    [componentId]
  );

  const setBackHeader = useCallback(() => {
    if (headerType.current !== 'back') {
      Navigation.mergeOptions(componentId, {
        topBar: {
          title: {
            ...Platform.select({
              ios: {
                component: {
                  name: 'EmptyView',
                  alignment: 'center'
                }
              },
              android: {
                text: ''
              }
            })
          }
        }
      });
      headerType.current = 'back';
    }
  }, [componentId]);

  const renderLoading = useCallback(
    () => (
      <View cls="flx-i pan-12">
        <ActivityIndicator />
      </View>
    ),
    []
  );

  const renderError = useCallback(
    () => <Text cls="ff-sfR tc fs-14">{t('linkedDetails.unavailable')}</Text>,
    []
  );

  const renderDetails = useCallback(() => {
    if (detailsType === 0) {
      return (
        <CommonNewsDetails
          id={id}
          componentId={componentId}
          shouldSkipLoadDetails
          hidePost={hidePost}
          setAuthorHeader={setAuthorHeader}
          setBackHeader={setBackHeader}
        />
      );
    }

    return (
      <SocialNewsDetails
        id={id}
        componentId={componentId}
        shouldSkipLoadDetails
        shouldLoadFullContent
        hidePost={hidePost}
        setAuthorHeader={setAuthorHeader}
        setBackHeader={setBackHeader}
      />
    );
  }, [detailsType, id, componentId, hidePost, setAuthorHeader, setBackHeader]);

  return (
    <View cls="flx-i">
      {loading ? renderLoading() : error ? renderError() : renderDetails()}
    </View>
  );
});

class LinkedNewsDetailsWrap extends React.Component {
  static options = () => ({
    topBar: {
      backButton: {
        icon: images.back,
        color: colors.commonGrey
      }
      // rightButtons: [
      //   {
      //     id: 2,
      //     icon: images.report
      //   },
      //   {
      //     id: 1,
      //     icon: images.bookmark
      //   },
      //   {
      //     id: 0,
      //     icon: images.share
      //   }
      // ]
    }
  });

  render() {
    return <LinkedNewsDetails {...this.props} />;
  }
}

export default LinkedNewsDetailsWrap;

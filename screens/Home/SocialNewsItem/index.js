/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect, useCallback } from 'react';
import { LayoutAnimation } from 'react-native';
import { useSelector } from 'react-redux';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { getPostDetails } from 'AINews/src/store/actions/posts';
import { wrap } from '@agiletechvn/react-theme';
import SocialNewsItemWithPost from 'AINews/src/screens/Home/SocialNewsItem/SocialNewsItemWithPost';
import SocialNewsItemWithoutPost from 'AINews/src/screens/Home/SocialNewsItem/SocialNewsItemWithoutPost';

type Props = {
  id: String,
  shouldLoadFullContent?: Boolean,
  shouldSkipLoadDetails?: Boolean
};

const SocialNewsItem = (props: Props) => {
  const { id, shouldLoadFullContent, shouldSkipLoadDetails } = props;

  const post = useSelector(state => state.posts[id]);
  const [postDetails, setPostDetails] = useState();

  const loadFullContent = useCallback(async () => {
    const loadedPostDetails = await callSagaRequest(getPostDetails, { id });
    LayoutAnimation.easeInEaseOut();
    setPostDetails(loadedPostDetails);
  }, []);

  useEffect(() => {
    if (shouldSkipLoadDetails) {
      setPostDetails(post);
    } else if (!post || shouldLoadFullContent) {
      loadFullContent();
    }
  }, []);

  if (!post || (post && shouldLoadFullContent && !postDetails)) {
    return <SocialNewsItemWithoutPost {...props} />;
  }

  return (
    <SocialNewsItemWithPost
      post={post}
      postDetails={postDetails}
      loadFullContent={loadFullContent}
      {...props}
    />
  );
};

SocialNewsItem.defaultProps = {
  shouldLoadFullContent: false,
  shouldSkipLoadDetails: false
};

export default memo(
  wrap(SocialNewsItem, 'defaultProps'),
  (prevProps: Props, nextProps: Props) => prevProps.id === nextProps.id
);

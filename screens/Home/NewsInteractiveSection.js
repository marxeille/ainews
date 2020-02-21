import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { sharePost } from 'AINews/src/utils/post';
import images from '../../../assets/images';
import NewsInteractiveButton from '../../elements/NewsInteractiveButton';
import { t } from '../../utils/LocalizationUtils';
import {
  upvotePost,
  unupvotePost,
  downvotePost,
  undownvotePost
} from '../../store/actions/user';

type Props = {
  id: String,
  onNewsDetailsShouldDisplay: () => void,
  noPaddingHorizontal: Boolean
};

const NewsInteractiveSection = (props: Props) => {
  const { id, onNewsDetailsShouldDisplay, noPaddingHorizontal = false } = props;
  const { upVoteNumber, downVoteNumber, commentNumber, vote } = useSelector(
    state => state.posts[id] || {
      upVoteNumber: 0,
      downVoteNumber: 0,
      commentNumber: 0,
      vote: 0
    }
  );
  const dispatch = useDispatch();

  function onUpvotePress() {
    if (vote === 1) {
      dispatch(unupvotePost({ postId: id }));
    } else {
      dispatch(upvotePost({ postId: id }));
    }
  }

  function onDownvotePress() {
    if (vote === -1) {
      dispatch(undownvotePost({ postId: id }));
    } else {
      dispatch(downvotePost({ postId: id }));
    }
  }

  async function onSharePress() {
    await sharePost(id);
  }

  return (
    <View cls={`flx-row jcsb pvn-14 ${noPaddingHorizontal ? '' : 'phn-31'}`}>
      <NewsInteractiveButton
        value={upVoteNumber - downVoteNumber}
        image={vote === 1 ? images.upvote_selected : images.upvote}
        callback={onUpvotePress}
        rightButton={{
          image: vote === -1 ? images.downvote_selected : images.downvote,
          callback: onDownvotePress
        }}
      />
      <NewsInteractiveButton
        value={commentNumber || 0}
        image={images.comment}
        callback={onNewsDetailsShouldDisplay}
      />
      <NewsInteractiveButton
        value={t('common.share')}
        image={images.share}
        callback={onSharePress}
      />
    </View>
  );
};

export default wrap(NewsInteractiveSection);

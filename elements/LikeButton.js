import React from 'react';
import NewsInteractiveButton from './NewsInteractiveButton';
import images from '../../assets/images';

type Props = {
  number: number,
  didLike: boolean,
  callback: any
};

const LikeButton = (props: Props) => {
  const { number, didLike, callback } = props;
  return (
    <NewsInteractiveButton
      value={number}
      image={didLike ? images.likeSelected : images.like}
      callback={callback}
    />
  );
};

export default LikeButton;

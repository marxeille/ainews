import React from 'react';
import ImageButton from './ImageButton';
import images from '../../assets/images';

type Props = {
  enabled: boolean,
  callback: any
};

const SendCommentButton = (props: Props) => {
  const { enabled, callback } = props;
  return (
    <ImageButton
      image={enabled ? images.send : images.sendDisabled}
      width={27}
      height={27}
      callback={enabled ? callback : null}
    />
  );
};

export default SendCommentButton;

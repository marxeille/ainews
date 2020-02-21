import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LayoutAnimation, Text, Image, TouchableOpacity } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import images from 'AINews/assets/images';

type Props = {
  componentRef: React.Ref
};

const UpdatedNotification = (props: Props) => {
  const { componentRef } = props;
  const [visible, setVisible] = useState(false);

  const timer = useRef(null);

  useEffect(
    () => () => {
      clearInterval(timer.current);
    },
    []
  );

  const setNotiVisible = () => {
    if (!visible) {
      LayoutAnimation.easeInEaseOut();
      setVisible(true);
      timer.current = setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setVisible(false);
      }, 2000);
    }
  };

  const setNotiInvisible = useCallback(() => {
    if (visible) {
      LayoutAnimation.easeInEaseOut();
      setVisible(false);
    }
  }, [visible]);

  if (componentRef) {
    componentRef.current = {
      setNotiVisible
    };
  }

  return (
    <TouchableOpacity
      cls="pWd-100 bg-topaz aic jcc flx-row oh"
      onPress={setNotiInvisible}
      style={{
        height: visible ? 48 : 0
      }}
    >
      <Image cls="wd-24 hg-24" source={images.loading} resizeMode="contain" />
      <Text cls="ml2 white ff-sfSb fs-14">Cập nhật tin tức mới nhất!</Text>
    </TouchableOpacity>
  );
};

export default wrap(UpdatedNotification);

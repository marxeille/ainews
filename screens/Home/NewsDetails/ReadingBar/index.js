import React, { useState, useRef, useEffect } from 'react';
import { View, LayoutAnimation, Platform } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

type Props = {
  componentRef: React.Ref
};

const ReadingBar = (props: Props) => {
  const { componentRef } = props;
  const [percent, setPercent] = useState(0);

  const timer = useRef(null);

  useEffect(
    () => () => {
      clearInterval(timer.current);
    },
    []
  );

  const setBar = rate => {
    if (rate <= 1 && rate >= 0 && rate >= percent) {
      if (Platform.OS === 'ios') {
        LayoutAnimation.linear();
      } else if (percent === 0) {
        timer.current = setTimeout(() => {
          LayoutAnimation.linear();
        }, 100);
      }

      setPercent(rate);
    } else if (percent !== 1) {
      LayoutAnimation.linear();
      setPercent(1);
    }
  };

  if (componentRef) {
    componentRef.current = {
      setBar
    };
  }

  return (
    <View cls="pWd-100">
      <View
        cls={`hg-2 bg-reddish pWd-${percent * 100} mtn-${
          percent === 0 ? 0 : Platform.OS === 'ios' ? 0 : 2
        }`}
      />
    </View>
  );
};

export default wrap(ReadingBar);

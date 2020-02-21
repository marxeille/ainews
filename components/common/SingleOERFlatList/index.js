import React, { useRef } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

type Props = {
  componentRef: React.Ref
} & FlatListProps;

function SingleOERFlatList(props: Props) {
  const {
    componentRef, onEndReached, onMomentumScrollBegin, ...rest
  } = props;

  const onEndReachedCalledDuringMomentum = useRef(false);

  function overridenOnEndReached() {
    if (!onEndReachedCalledDuringMomentum.current) {
      onEndReached();
      onEndReachedCalledDuringMomentum.current = true;
    }
  }

  function overridenOnMomentumScrollBegin() {
    onEndReachedCalledDuringMomentum.current = false;
  }

  return (
    <FlatList
      ref={componentRef}
      {...rest}
      onEndReached={overridenOnEndReached}
      onMomentumScrollBegin={overridenOnMomentumScrollBegin}
    />
  );
}

export default wrap(SingleOERFlatList);

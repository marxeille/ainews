import React, { memo } from 'react';

type Props = {
  shouldUpdated: boolean
};

function StaticContainer(props: Props) {
  const child = props.children;
  if (child === null || child === false) {
    return null;
  }

  return React.Children.only(child);
}

export default memo(StaticContainer);

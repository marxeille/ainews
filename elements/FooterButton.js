import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

type Props = {
  label: String,
  callback: any,
  active: boolean
};

const FooterButton = (props: Props) => {
  const { label, callback, active } = props;

  function handlePress() {
    if (active) {
      callback();
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={active ? 0.7 : 1.0}>
      <View cls={`bw-2 ${active ? 'b--white' : 'b--grey'} pv3 ph4 brs-30`}>
        <Text cls={`f5 ff-sfB ${active ? 'white' : 'grey'}`}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default wrap(FooterButton);

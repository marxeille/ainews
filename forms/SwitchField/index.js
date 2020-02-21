import React from 'react';
import {
  View, Switch, Text, Platform
} from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import colors from 'AINews/src/themes/colors';

export default wrap(
  ({
    input,
    meta: {
      active, touched, error, warning
    },
    style,
    label,
    onValueChange,
    textStyle
  }) => (
    <View style={[style]}>
      {label ? <Text style={[textStyle]}>{label}</Text> : null}
      <Switch
        value={typeof input.value === 'boolean' ? input.value : false}
        onValueChange={(value) => {
          input.onChange(value);
          onValueChange && onValueChange(input);
        }}
        trackColor={{ true: colors.reddish }}
        thumbColor={Platform.OS === 'ios' ? null : colors.white}
      />
    </View>
  )
);

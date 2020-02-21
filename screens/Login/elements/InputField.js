import React from 'react';
import { TextInput } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

const InputField = props => (
  <TextInput cls="fs-24 blackish" {...props} />
);

export default wrap(InputField);

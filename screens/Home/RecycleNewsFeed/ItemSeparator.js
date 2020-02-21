import React, { memo } from 'react';
import { View } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

const ItemSeparator = () => <View cls="hg-6 bg-paleGray fullWidth" />;

export default memo(wrap(ItemSeparator));

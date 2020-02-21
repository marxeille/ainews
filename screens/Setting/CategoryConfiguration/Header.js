import React from 'react';
import { View, Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import { t } from 'AINews/src/utils/LocalizationUtils';

class CategoryConfigurationHeader extends React.PureComponent {
  render() {
    return (
      <View cls="phn-12 pvn-12 aic">
        <Text cls="fs-13 commonBlack tc ff-sfR">
          {t('categoryConfiguration.description')}
        </Text>
      </View>
    );
  }
}

export default wrap(CategoryConfigurationHeader);

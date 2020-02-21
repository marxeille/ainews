import React from 'react';
import { useSelector } from 'react-redux';
import {
  View, Text, Platform, Switch
} from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import colors from 'AINews/src/themes/colors';
import { t } from 'AINews/src/utils/LocalizationUtils';

const ChangeTheme = () => {
  const nightMode = useSelector(state => state.themes.nightMode)

  return (
    <View
      cls="bg-white flx-row jcc aic hg-60"
    >
      <View cls="flx-i">
        <Text cls="ff-sfSb fs-14">{t('personal.nightMode')}</Text>
      </View>
      <Switch
        value={typeof nightMode === 'boolean' ? nightMode : false}
        // onValueChange={(value) => {
        //   input.onChange(value);
        //   onValueChange && onValueChange(input);
        // }}
        trackColor={{ true: colors.reddish }}
        thumbColor={Platform.OS === 'ios' ? null : colors.white}
      />
    </View>
  )
}


const ChangeThemeButton = wrap(ChangeTheme);

export default ChangeThemeButton;

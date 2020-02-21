import React from 'react';
import { View } from 'react-native';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { reduxForm } from 'redux-form';
// import { wrap } from '@agiletechvn/react-theme';
// import * as themeActions from 'AINews/src/store/actions/themes';
import colors from 'AINews/src/themes/colors';
import { t } from 'AINews/src/utils/LocalizationUtils';
// import SettingCore from './SettingCore';
import PersonalSetting from '../UserPersonal/PersonalSetting';

class Setting extends React.Component {
  static options() {
    return {
      topBar: {
        noBorder: true,
        visible: true,
        title: {
          fontSize: 17,
          color: colors.profileEditTitle,
          fontFamily: 'SFUIText-Bold',
          text: t('personal.appSettings')
        }
      }
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PersonalSetting />
      </View>
    )
    // <SettingCore {...this.props} />;
  }
}

export default Setting;

// export default compose(
//   connect(
//     state => ({
//       theme: state.themes.nightMode
//     }),
//     { ...themeActions },
//     (stateProps, dispatchProps, ownProps) => ({
//       initialValues: {
//         enableReinitialize: true,
//         theme: stateProps.theme
//       },
//       ...ownProps,
//       ...stateProps,
//       ...dispatchProps
//     })
//   ),
//   reduxForm({
//     form: 'SettingForm',
//     validate: (values) => {},
//     destroyOnUnmount: false
//   }),
//   wrap
// )(Setting);

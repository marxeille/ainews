import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Navigation } from 'react-native-navigation';
import { wrap } from '@agiletechvn/react-theme';

import colors from 'AINews/src/themes/colors';
import * as userActions from 'AINews/src/store/actions/user';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { t } from 'AINews/src/utils/LocalizationUtils';
import Bootstrap from 'AINews/src/App/Bootstrap';

import PersionalEditCore from './PersonalEditCore';

type Props = {
  handleSubmit: Function,
  updateMe: Function
};

class PersionalEdit extends React.Component<Props> {
  static options() {
    return {
      topBar: {
        noBorder: true,
        visible: true,
        title: {
          fontSize: 17,
          color: colors.profileEditTitle,
          fontFamily: 'SFUIText-Bold',
          text: t('personalEdit.title')
        },
        rightButtons: [
          {
            id: 'save',
            text: t('personalEdit.save'),
            color: colors.reddish,
            fontFamily: 'SFProText-Bold'
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  navigationButtonPressed({ buttonId }) {
    const { handleSubmit, updateMe } = this.props;

    switch (buttonId) {
      case 'save':
        try {
          handleSubmit(async values => {
            const updatedProfile = {
              fullName: values.displayName,
              about:
                values.description && values.description.length > 0
                  ? values.description
                  : null
            };

            const result = await callSagaRequest(
              userActions.updateProfile,
              updatedProfile
            );
            updateMe(updatedProfile);

            Alert.alert(
              t('common.notification'),
              t('personalEdit.updateSuccessfully'),
              [
                {
                  text: 'OK',
                  onPress: () => {
                    Bootstrap.popToRoot();
                  }
                }
              ]
            );
          })(null);
        } catch (error) {
          Alert.alert(t('common.notification'), t('personalEdit.updateFailed'));
        }
        break;

      default:
        break;
    }
  }

  render() {
    return <PersionalEditCore {...this.props} />;
  }
}

export default compose(
  connect(
    state => ({
      profile: state.me.profile
    }),
    { ...userActions },
    (stateProps, dispatchProps, ownProps) => ({
      initialValues: {
        enableReinitialize: true,
        avatar: {
          uri: stateProps.profile.avatar || ''
        },
        displayName: stateProps.profile.fullName || '',
        description: stateProps.profile.about || ''
      },
      ...ownProps,
      ...stateProps,
      ...dispatchProps
    })
  ),
  reduxForm({
    form: 'PersonalEditForm',
    validate: values => {
      const errors = {};
      if (!values.displayName) {
        errors.displayName = 'Không được để trống trường tên';
      }

      return errors;
    },
    destroyOnUnmount: true
  }),
  wrap
)(PersionalEdit);

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { Field, change } from 'redux-form';
import {
  View, Text, Alert, Platform
} from 'react-native';
import KeyboardInputScrollView from 'react-native-input-scroll-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { wrap } from '@agiletechvn/react-theme';
import { PhotoField, InputField } from 'AINews/src/forms';
import { t } from 'AINews/src/utils/LocalizationUtils';
import { callSagaRequest } from 'AINews/src/utils/RequestHandler';
import { updateAvatar } from 'AINews/src/store/actions/user';
import colors from 'AINews/src/themes/colors';


type Props = {
  dispatch: Function
}

class PersonalEditCore extends PureComponent<Props> {
  onAvatarChange = async (imageObject) => {
    const { dispatch } = this.props
    try {
      const result = await callSagaRequest(updateAvatar, { avatar: imageObject.data });
      if (result && result.avatar) {
        dispatch(change('PersonalEditForm', 'avatar', { uri: imageObject.uri }))
      }
    } catch (error) {
      Alert.alert(
        t('common.notification'),
        t('personalEdit.updateFailed'),
      );
    }
  }

  renderMain= () => (
    <View>
      <Field
        name="cover"
        component={PhotoField}
        resizeMode="cover"
        cls="wd-0 hg-0"
        imageContainerCls="hg-0 wd-0"
        noPhotoChooser
      />

      <View cls="aic jcc mtn-25">
        <Field
          name="avatar"
          component={PhotoField}
          resizeMode="center"
          circle={72}
          square={80}
          imageContainerCls="ba b--separatingLine"
          iconContainerCls="bg-reddish circleFn-24 jcc aic bwh b--white absolute bottom-0 right-0 oh mb1 mr1"
          onSuccess={this.onAvatarChange}
        />
      </View>
      <View cls="ph3">
        <Text cls="commonBlack mtn-24 fs-17 ff-sfB">{`${t('personalEdit.displayName')} (${t('personalEdit.required')})`}</Text>
        <Field
          inputRef={(ref) => { this.displayName = ref }}
          cls="phn-16 pvn-8 bg-textInputBackground mtn-13 hg-44 brs-5 ff-sfR"
          returnKeyType="done"
          containerCls=""
          autoCapitalize="none"
          label={t('personalEdit.displayNamePlaceHolder')}
          placeholderColor={colors.profileTitle}
          name="displayName"
          component={InputField}
          autoCorrect={false}
          inputCls=""
        />
        <Text cls="commonBlack mtn-13 fs-14 ff-sfR">
          {t('personalEdit.displayNameNote')}
        </Text>
        <Text cls="commonBlack mtn-24 mv3 fs-17 ff-sfB">{`${t('personalEdit.about')} (${t('personalEdit.optional')})`}</Text>
        <Field
          inputRef={(ref) => { this.about = ref }}
          cls="br2 phn-16 pvn-8 bg-textInputBackground hg-120 brs-5 pt2 ff-sfR"
          returnKeyType="default"
          containerCls=""
          autoCapitalize="none"
          label={t('personalEdit.aboutPlaceHolder')}
          name="description"
          component={InputField}
          autoCorrect={false}
          inputCls=""
          multiline
        />
        {/* <Field name="contentVisibility" component={SwitchField} /> */}
      </View>
    </View>
  )

  render() {
    return (
      <View cls="flx-i">
        {Platform.OS === 'ios' ? (
          <KeyboardAwareScrollView
            cls="flx-i"
            enableResetScrollToCoords={false}
            enableOnAndroid
            extraScrollHeight={50}
          >
            {this.renderMain()}
          </KeyboardAwareScrollView>
        ) : (
          <KeyboardInputScrollView
            cls="flx-i"
            enableResetScrollToCoords={false}
            keyboardAvoidingViewProps={{
              keyboardVerticalOffset: 150
            }}
          >
            {this.renderMain()}
          </KeyboardInputScrollView>
        )}

      </View>
    );
  }
}

export default compose(wrap)(PersonalEditCore);

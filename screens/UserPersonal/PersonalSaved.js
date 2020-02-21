import React from 'react';
import { View } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import SavedPosts from '../SavedPosts';


class PersonalSaved extends React.PureComponent {
  render() {
    return (
      <View cls="flx-i">
        <SavedPosts />
      </View>
    )
  }
}

export default wrap(PersonalSaved);

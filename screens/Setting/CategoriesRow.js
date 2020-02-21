import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { wrap } from '@agiletechvn/react-theme';

import ImageButton from 'AINews/src/elements/ImageButton';
import images from 'AINews/assets/images';

import SettingRow from './SettingRow';

type Props = {
  categories: Array,
  onPress: Function
};

class CategoriesRow extends PureComponent<Props> {
  getMyFeedsString = () => {
    const { categories } = this.props;

    if (!categories || (Array.isArray(categories) && categories.length < 2)) {
      return '';
    }

    const currentCategories = JSON.parse(JSON.stringify(categories));
    currentCategories.shift();

    const myFeedsCategories = currentCategories
      .filter(category => category.id !== 'dexuat')
      .map(category => category.name);

    if (myFeedsCategories.length === 1) {
      return myFeedsCategories[0];
    }

    if (myFeedsCategories.length === 2) {
      return `${myFeedsCategories[0]}, ${myFeedsCategories[1]}`;
    }
    return `${myFeedsCategories[0]}, ${
      myFeedsCategories[1]
    }, +${currentCategories.length - 2}`;
  };

  render() {
    const { onPress } = this.props;
    return (
      <SettingRow leftTitle={this.getMyFeedsString()} onPress={onPress}>
        <ImageButton
          image={images.chevronRight}
          width={16}
          height={16}
          callback={() => {}}
        />
      </SettingRow>
    );
  }
}

export default compose(
  connect(state => ({
    categories: state.categories.categories
  })),
  wrap
)(CategoriesRow);

import _ from 'lodash';

import {
  ACTION_SYNC_CATEGORIES,
  ACTION_SAVE_CATEGORIES,
  ACTION_ADD_CATEGORY_LOCALLY,
  ACTION_REMOVE_CATEGORY_LOCALLY
} from '../constants';

const initState = {
  categories: []
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case ACTION_SYNC_CATEGORIES:
      const newCategories = _.orderBy(payload.categories, 'order', 'asc');
      return {
        ...state,
        categories: [
          {
            id: 'dexuat',
            name: 'Đề xuất'
          },
          ...newCategories
            .filter(category => category.followed === 1)
            .map(category => ({ id: category.id, name: category.name }))
        ]
      };

    case ACTION_SAVE_CATEGORIES:
      return { ...state, categories: payload.categories };

    case ACTION_ADD_CATEGORY_LOCALLY:
      return {
        categories: [
          ...state.categories,
          { id: payload.id, name: payload.name }
        ]
      };

    case ACTION_REMOVE_CATEGORY_LOCALLY: {
      return {
        categories: state.categories.filter(
          category => category.id !== payload.id
        )
      };
    }

    default:
      return state;
  }
};

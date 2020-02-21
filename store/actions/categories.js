import {
  ACTION_GET_CATEGORIES,
  ACTION_GET_CATEGORIES_WITHOUT_SYNC,
  ACTION_SYNC_CATEGORIES,
  ACTION_SAVE_CATEGORIES,
  ACTION_ADD_CATEGORY_LOCALLY,
  ACTION_REMOVE_CATEGORY_LOCALLY
} from '../constants';

export const getCategories = callback => ({
  type: ACTION_GET_CATEGORIES,
  args: [callback]
});

export const getCategoriesWithoutSync = callback => ({
  type: ACTION_GET_CATEGORIES_WITHOUT_SYNC,
  args: [callback]
});

export const syncCategories = categories => ({
  type: ACTION_SYNC_CATEGORIES,
  payload: { categories }
});

export const saveCategories = categories => ({
  type: ACTION_SAVE_CATEGORIES,
  payload: {
    categories
  }
});

export const addCategoryLocally = ({ id, name }) => ({
  type: ACTION_ADD_CATEGORY_LOCALLY,
  payload: {
    id,
    name
  }
});

export const removeCategoryLocally = ({ id }) => ({
  type: ACTION_REMOVE_CATEGORY_LOCALLY,
  payload: {
    id
  }
});

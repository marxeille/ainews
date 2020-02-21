import { ACTION_SAVE_REPORTS } from '../constants';

const initState = {
  reports: []
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case ACTION_SAVE_REPORTS:
      return {
        ...state,
        reports:
          (payload.reports
            && Array.isArray(payload.reports)
            && payload.reports)
          || []
      };
    default:
      return state;
  }
};

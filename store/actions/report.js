import { ACTION_GET_REPORTS, ACTION_SAVE_REPORTS } from '../constants';

export const getReports = callback => ({
  type: ACTION_GET_REPORTS,
  args: [callback]
});

export const saveReports = reports => ({
  type: ACTION_SAVE_REPORTS,
  payload: {
    reports
  }
});

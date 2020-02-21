import React from 'react';
import { wrap } from '@agiletechvn/react-theme';
import { compose } from 'redux';

import useReport from 'AINews/src/hooks/useReport';

function PreFetch() {
  useReport();

  return null;
}

export default compose(wrap)(PreFetch);

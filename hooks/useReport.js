import { useEffect } from 'react';
import { getReports } from 'AINews/src/store/actions/report';
import { callSagaRequest } from '../utils/RequestHandler';

const useReport = () => {
  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    try {
      await callSagaRequest(getReports);
    } catch (err) {
      console.log('Me error', err);
    }
  };

  return null;
};

export default useReport;

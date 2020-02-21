import { useState } from 'react';
import { getCategories } from '../store/actions/categories';
import { callSagaRequest } from '../utils/RequestHandler';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setloading] = useState(false);

  async function loadCategories() {
    setloading(true);

    try {
      const result = await callSagaRequest(getCategories);
      setCategories(result);
    } catch (err) {
      console.log('useCategories/loading error', err);
    } finally {
      setloading(false);
    }
  }

  return [categories, loadCategories, loading];
};

export default useCategories;

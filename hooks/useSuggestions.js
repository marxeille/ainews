import { useState, useEffect } from 'react';
import { getSuggestions } from '../store/actions/suggestions';
import { callSagaRequest } from '../utils/RequestHandler';

const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const items = await callSagaRequest(getSuggestions);
      setSuggestions(items);
    } catch (err) {
      console.log('useSuggestions/load error', err);
    } finally {
      setLoading(false);
    }
  }

  return [
    suggestions,
    // load,
    loading
  ];
};

export default useSuggestions;

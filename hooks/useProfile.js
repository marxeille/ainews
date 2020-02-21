import { useState, useEffect } from 'react';
import { me } from 'AINews/src/store/actions/user';
import { callSagaRequest } from '../utils/RequestHandler';

const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);

    try {
      const result = await callSagaRequest(me);
      if (result) {
        setProfile(result);
      }
    } catch (err) {
      console.log('Me error', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    getProfile,
    loading
  };
};

export default useProfile;

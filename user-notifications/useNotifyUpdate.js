import {useState} from 'react';
import {UPDATE_NOTIFY} from 'shared/hooks/use-user-notifications/queries';
import {useMutation} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';

/**
 * This hook allows to update a single notification item
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{updateNotify: *, loading: *}}
 */
const useNotifyUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [sendRequest] = useMutation(UPDATE_NOTIFY);
  const {
    stack: {user = {}},
  } = useSession();
  const updateNotify = async (payload = {}, onSaved) => {
    setLoading(true);
    try {
      await sendRequest({
        variables: {userId: user.id, ...payload},
      });
      setLoading(false);
      if (onSaved) {
        onSaved();
      }
    } catch (e) {
      console.log('Error: ', e);
      setLoading(false);
    }
  };
  return {
    updateNotify,
    loading,
  };
};

export default useNotifyUpdate;

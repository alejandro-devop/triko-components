import {useState} from 'react';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {REMOVE_CLIENT_ADDRESS} from './queries';
import useNotify from 'shared/hooks/use-notification';
import {useMutation} from '@apollo/react-hooks';
const useAddressRemove = () => {
  const [loading, setLoading] = useState(false);
  const {error} = useNotify();
  const reportError = useErrorReporter({
    path: 'src/shared/components/my-address-list/hooks.js',
  });
  const [sendRequest] = useMutation(REMOVE_CLIENT_ADDRESS);

  const removeAddress = async (id) => {
    setLoading(true);
    try {
      await sendRequest({
        variables: {
          id,
        },
      });
      setLoading(false);
    } catch (e) {
      reportError(e);
      setLoading(false);
      error('Error while removing the address');
    }
  };
  return {
    loading,
    removeAddress,
  };
};

export default useAddressRemove;

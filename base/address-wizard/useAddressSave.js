import {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {SAVE_ADDRESS_CLIENT, SAVE_ADDRESS_TRIKO} from './queries';
import {useSession} from 'hooks/index';
import useTranslation from 'shared/hooks/use-translate';
import useNotify from 'shared/hooks/use-notification';

const useAddressSave = (options = {}) => {
  const {isTriko} = options;
  const [loading, setLoading] = useState(false);
  const {
    stack: {triko = {}, myAddresses, client = {}, locale},
    setKey,
  } = useSession();
  const {_t} = useTranslation();
  const {error, success} = useNotify();
  const [saveAddress] = useMutation(
    isTriko ? SAVE_ADDRESS_TRIKO : SAVE_ADDRESS_CLIENT,
  );

  const sendRequest = async ({onSaved, form}) => {
    const {address: addressObj = {}, name, type} = form;
    const {address, position = {}} = addressObj;
    setLoading(true);
    try {
      const {data} = await saveAddress({
        variables: {
          address,
          isMain: 1,
          lat: position.lat,
          lng: position.lng,
          locale,
          ...(isTriko
            ? {triko: triko.id, title: 'Triko address', buildingType: 1}
            : {client: client.id, buildingType: type, title: name}),
        },
      });
      if (data.response) {
        setKey('myAddresses', [...myAddresses, data.response]);
        setLoading(false);
        success(_t('address_saved_message'));
        if (onSaved) {
          setTimeout(() => {
            onSaved();
          }, 300);
        }
      } else {
        error('Could not save the address');
        console.log('Error: while saving the address');
        setLoading(false);
      }
    } catch (e) {
      error(_t('address_error_message'));
      console.log('Error: ', e);
      setLoading(false);
    }
  };
  return {
    loading,
    sendRequest,
  };
};

export default useAddressSave;

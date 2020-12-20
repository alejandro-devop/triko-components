import {useState} from 'react';
import {useSession} from 'hooks/index';
import useTranslation from 'hooks/useTranslation';
import useNotify from 'hooks/useNotification';
import {useMutation} from '@apollo/react-hooks';
import {SAVE_ADDRESS_CLIENT, SAVE_ADDRESS_TRIKO} from './queries';

export const useAddressUpdate = () => {};

export const useAddressSave = (options = {}) => {
  const {isTriko, isEditing} = options;
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
    const {address: addressObj = {}, name, type, addressId} = form;
    const {address, position = {}} = addressObj;
    setLoading(true);
    try {
      const {data} = await saveAddress({
        variables: {
          id: isEditing ? addressId : null,
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
        if (!isEditing) {
          setKey('myAddresses', [...myAddresses, data.response]);
        } else {
          setKey(
            'myAddresses',
            myAddresses.map((item) => {
              if (item.id === addressId) {
                item = data.response;
              }
              return item;
            }),
          );
        }
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

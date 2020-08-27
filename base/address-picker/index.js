import React, {useState} from 'react';
import PropTypes from 'prop-types';
import InputWrapper from './InputWrapper';
import AddressControl from './AddressControl';
import AddressesList from './AddressesList';
import {GET_ADDRESSES} from './queries';
import {useQuery} from '@apollo/react-hooks';
import useSession from 'hooks/useSession';

/**
 * This component renders a control to select addresses from the client addresses.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client
 * @param placeholder
 * @param onSave
 * @param name
 * @param onChange
 * @param disableControl
 * @param label
 * @param value
 * @returns {*}
 * @constructor
 */
const AddressPicker = ({
  placeholder,
  disableControl,
  name,
  onChange,
  label,
  value,
}) => {
  const [opened, setOpened] = useState(disableControl);
  const {
    setKey,
    stack: {client},
  } = useSession();
  const {data, loading, refetch} = useQuery(GET_ADDRESSES, {
    variables: {
      client: client.id,
    },
    fetchPolicy: 'cache', // Todo: There is a problem with the policy
    pollInterval: 500,
    onCompleted: ({response}) => {
      if (response && Array.isArray(response)) {
        setKey('myAddresses', response);
      }
    },
  });
  const onSaveAddress = async () => {
    await refetch();
  };
  const toggleControl = () => setOpened(!opened);
  const handleSelect = selectedItem => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: selectedItem,
        },
      });
    }
    toggleControl();
  };
  const addresses = data && Array.isArray(data.response) ? data.response : [];
  const list = (
    <AddressesList
      addresses={addresses}
      disableModal={disableControl}
      open={Boolean(opened)}
      loading={loading}
      onClose={toggleControl}
      selected={value || {}}
      onSelect={handleSelect}
      onSaveAddress={onSaveAddress}
    />
  );
  if (disableControl) {
    return list;
  }
  return (
    <InputWrapper>
      <AddressControl
        value={value}
        label={label}
        placeholder={placeholder}
        onPress={toggleControl}
      />
      {list}
    </InputWrapper>
  );
};

AddressPicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.shape({
    title: PropTypes.string,
    address: PropTypes.string,
  }),
};

export default AddressPicker;

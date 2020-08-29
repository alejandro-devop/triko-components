import React, {useState} from 'react';
import InputControl from './InputControl';
import useSession from 'shared/hooks/use-session-triko';
import WizardWrapper from 'shared/components/base/controls/address-input/WizardWrapper';
import MyAddressesWrapper from 'shared/components/base/controls/address-input/MyAddressesWrapper';
import AddressWizard from 'shared/components/base/address-wizard';

const AddressInput = ({
  error,
  label,
  name,
  onChange,
  placeholder,
  required,
  secondary,
  value,
}) => {
  const {
    stack: {logged},
  } = useSession();
  const [openList, setOpenList] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(value);
  const [openForm, setOpenForm] = useState(false);
  const toggleList = () => setOpenList(!openList);
  const toggleForm = () => {
    toggleList();
    setOpenForm(!openForm);
  };
  const onCloseForm = () => setOpenForm(false);
  const onAddressSaved = () => {
    setOpenForm(false);
    setTimeout(() => {
      setOpenList(true);
    }, 800);
  };

  const onSelectAddress = address => {
    setSelectedAddress(address);
    setOpenList(false);
    if (onChange) {
      onChange({
        target: {
          name,
          value: address,
        },
      });
    }
  };
  return (
    <>
      <InputControl
        error={error}
        label={label}
        onPress={() => (logged ? toggleList() : toggleForm())}
        placeholder={placeholder}
        required={required}
        secondary={secondary}
        value={selectedAddress}
      />
      {openList && (
        <MyAddressesWrapper
          onAddAddress={toggleForm}
          onSelectAddress={onSelectAddress}
          open={openList}
          onClose={toggleList}
        />
      )}
      {openForm && (
        <WizardWrapper onClose={onCloseForm} open={openForm}>
          <AddressWizard onSaved={onAddressSaved} />
        </WizardWrapper>
      )}
    </>
  );
};

export default AddressInput;

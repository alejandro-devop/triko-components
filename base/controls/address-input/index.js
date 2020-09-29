import React, {useState} from 'react';
import InputControl from './InputControl';
import useSession from 'shared/hooks/use-session-triko';
import WizardWrapper from 'shared/components/base/controls/address-input/WizardWrapper';
import MyAddressesWrapper from 'shared/components/base/controls/address-input/MyAddressesWrapper';
import AddressWizard from 'shared/components/base/address-wizard';

const AddressInput = ({
  enableAddButton,
  error,
  isTriko,
  label,
  name,
  onChange,
  placeholder,
  disabled,
  required,
  secondary,
  useWizard,
  useWizardLabel = 'other_address_text',
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

  const onAddressSaved = (address) => {
    setOpenForm(false);
    if (useWizard) {
      onSelectAddress(address);
    } else {
      setTimeout(() => {
        setOpenList(true);
      }, 800);
    }
  };

  const onSelectAddress = (address) => {
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
        disabled={disabled}
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
          enableAddButton={enableAddButton || !isTriko}
          isTriko={isTriko}
          onAddAddress={toggleForm}
          onSelectAddress={onSelectAddress}
          open={openList}
          onClose={toggleList}
          useWizard={useWizard}
          useWizardLabel={useWizardLabel}
        />
      )}
      {openForm && (
        <WizardWrapper
          title={useWizard ? useWizardLabel : null}
          onClose={onCloseForm}
          open={openForm}>
          <AddressWizard
            isTriko={isTriko}
            useWizard={useWizard}
            useWizardLabel={useWizardLabel}
            onSaved={onAddressSaved}
          />
        </WizardWrapper>
      )}
    </>
  );
};

export default AddressInput;

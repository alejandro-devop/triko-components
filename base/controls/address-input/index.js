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

  return (
    <>
      <InputControl
        error={error}
        label={label}
        onPress={() => (logged ? toggleList() : toggleForm())}
        placeholder={placeholder}
        required={required}
        secondary={secondary}
        value={value}
      />
      {openList && (
        <MyAddressesWrapper
          onAddAddress={toggleForm}
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

import React, {useState} from 'react';
import InputControl from './InputControl';
import useSession from 'shared/hooks/use-session-triko';
import WizardWrapper from 'shared/components/base/controls/address-input/WizardWrapper';
import MyServicesWrapper from 'shared/components/base/controls/address-input/MyServicesWrapper';
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
  const [openForm, setOpenForm] = useState(true);
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
    }, 300);
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
        <MyServicesWrapper
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

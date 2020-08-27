import React, {useState} from 'react';
import InputControl from './InputControl';
import MyAddress from './MyAddress';
import AddressForm from 'shared/components/address-form';
import {isEmpty} from 'shared/utils/functions';
import useSession from 'shared/hooks/use-session-triko';

const AddressInput = ({
  error,
  label,
  name,
  onChange,
  placeholder,
  required,
  value,
}) => {
  const {
    stack: {logged},
  } = useSession();
  const [openList, setOpenList] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({});
  const toggleList = () => setOpenList(!openList);
  const toggleForm = () => {
    toggleList();
    setOpenForm(!openForm);
  };
  const onChangeForm = ({target: {name: inputName, value: inputValue}}) => {
    setForm({
      ...form,
      [inputName]: inputValue,
    });
  };
  const isValid = !isEmpty(form.address);

  const submitAddress = () => {
    const {address} = form;
    if (onChange) {
      onChange({
        target: {
          name,
          value: {
            address: address.address,
            buildingType: form.buildingType,
            title: form.name,
            lat: address.lat,
            lng: address.lng,
          },
        },
      });
    }
    setOpenForm(false);
  };

  return (
    <>
      <InputControl
        error={error}
        label={label}
        onPress={() => (logged ? toggleList() : toggleForm())}
        placeholder={placeholder}
        required={required}
        value={value}
      />
      {openList && (
        <MyAddress
          address={value}
          onClose={toggleList}
          toggleForm={toggleForm}
          open={openList}
        />
      )}
      {openForm && (
        <AddressForm
          form={form}
          isValid={isValid}
          onChange={onChangeForm}
          onNext={submitAddress}
          onCancel={toggleForm}
          withDialog
        />
      )}
    </>
  );
};

export default AddressInput;

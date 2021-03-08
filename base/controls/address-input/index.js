import React, {useState} from 'react';
import InputControl from './InputControl';
import PropTypes from 'prop-types';
import useSession from 'shared/hooks/use-session-triko';
import WizardWrapper from 'shared/components/base/controls/address-input/WizardWrapper';
import MyAddressesWrapper from 'shared/components/base/controls/address-input/MyAddressesWrapper';
import AddressWizard from 'shared/components/base/address-wizard';
import useAddressSave from 'shared/components/base/address-wizard/useAddressSave';
import {LoadingCurtain} from 'components/base/dialogs';
import MapPicker from 'shared/components/base/controls/map-picker';

/**
 * This component allows to manage and pick the user addresses.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param disabled
 * @param enableAddButton
 * @param disableRemove
 * @param error
 * @param isTriko
 * @param label
 * @param name
 * @param onChange
 * @param placeholder
 * @param required
 * @param secondary
 * @param forceSave
 * @param useWizard
 * @param onSaved
 * @param useWizardLabel
 * @param value
 * @returns {*}
 * @constructor
 */
const AddressInput = ({
  disabled,
  disableRemove,
  enableAddButton,
  error,
  isTriko,
  label,
  name,
  onChange,
  placeholder,
  required,
  secondary,
  forceSave,
  useWizard,
  useWizardLabel = 'other_address_text',
  onSaved,
  value,
}) => {
  const {
    stack: {logged, myAddresses},
  } = useSession();
  const [openList, setOpenList] = useState(false);
  const [askSaveAddress, setAskSaveAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(value);
  const [openForm, setOpenForm] = useState(false);
  const {loading, sendRequest} = useAddressSave({isTriko});
  const toggleList = () => setOpenList(!openList);
  const toggleAskSave = () => setAskSaveAddress(!askSaveAddress);

  /**
   * Function used to toggle the form state (including the list state).
   */
  const toggleForm = () => {
    toggleList();
    setOpenForm(!openForm);
  };

  /**
   * Function to close the form state.
   */
  const onCloseForm = () => setOpenForm(false);

  /**
   * This function is triggered when an address is saved.
   * @param address
   */
  const onAddressSaved = (address) => {
    setOpenForm(false);
    if (useWizard) {
      onSelectAddress(address);
      if (isTriko && myAddresses.length === 0) {
        toggleAskSave();
      }
    } else {
      setTimeout(() => {
        setOpenList(true);
      }, 800);
    }
    if (onSaved) {
      onSaved(address);
    }
  };

  const saveAddedAddress = async () => {
    const {address, lat, lng} = value;
    await sendRequest({
      onSaved: () => setAskSaveAddress(false),
      form: {
        address: {address, position: {lat, lng}},
      },
    });
  };

  /**
   * This function is triggered when the user selects an address from the list.
   * @param address
   */
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
      {loading && <LoadingCurtain />}
      {logged && (
        <>
          <InputControl
            askSaveAddress={askSaveAddress}
            disabled={disabled}
            error={error}
            label={label}
            onPress={() => (logged ? toggleList() : toggleForm())}
            onAcceptSave={saveAddedAddress}
            onCancelSave={toggleAskSave}
            placeholder={placeholder}
            required={required}
            secondary={secondary}
            value={selectedAddress}
          />
          {openList && (
            <MyAddressesWrapper
              enableAddButton={enableAddButton || !isTriko}
              isTriko={isTriko}
              disableRemove={disableRemove}
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
                forceSave={forceSave}
              />
            </WizardWrapper>
          )}
        </>
      )}
      {!logged && (
        <>
          <MapPicker onChange={onChange} name={name} value={value} primary />
        </>
      )}
    </>
  );
};

AddressInput.propTypes = {
  disabled: PropTypes.bool,
  enableAddButton: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isTriko: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onSaved: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  secondary: PropTypes.bool,
  useWizard: PropTypes.bool,
  useWizardLabel: PropTypes.string,
  value: PropTypes.shape({
    address: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default AddressInput;

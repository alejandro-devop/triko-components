import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import useTranslation from 'shared/hooks/use-translate';
import {useStyles} from '@triko-app/hooks';
import GCitySelect from 'shared/components/base/controls/g-city-select';
import EnterAddress from 'shared/components/base/address-wizard/EnterAddress';
import FixTheAddress from 'shared/components/address-suggester/FixTheAddress';
import AddressForm from './AddressForm';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
import {useAddressSave} from './hooks';
import PermissionsManager, {
  PERMISSIONS,
} from 'shared/components/permissions-manager';
import WizardDialog from 'shared/components/base/address-wizard/wizard-dialog';
import {isEmpty} from 'shared/utils/functions';

const getDefaultValues = (defaultValues, defaultQuery) => {
  let newValues = {
    address: null,
    type: null,
    name: null,
    description: null,
    city: defaultQuery,
  };
  if (!isEmpty(defaultValues) && !isEmpty(defaultValues.address)) {
    const [address, ...city] = defaultValues.address.split(', ');
    newValues = {
      address: {
        primaryText: address,
      },
      city: city.join(', '),
      name: defaultValues.title,
      description: defaultValues.description,
      type: defaultValues.type.id,
    };
  }
  return newValues;
};

const AddressWizard = ({
  defaultQuery = '',
  defaultValues,
  forceSave,
  isTriko,
  isEditing,
  useDialog,
  useWizard,
  open,
  onClose,
  onSaved,
  skipForm,
}) => {
  const [classes] = useStyles(styles);
  const [currentStep, setCurrentStep] = useState(isTriko || skipForm ? 1 : 0);
  const [mode, setMode] = useState(0);
  const {loading, sendRequest: saveAddress} = useAddressSave({
    isTriko,
    isEditing,
  });
  const [form, setForm] = useState({
    ...getDefaultValues(defaultValues, defaultQuery),
  });

  const {_t} = useTranslation();

  const onChangeMode = (newMode) => {
    setMode(newMode);
  };

  const onSelectCity = ({target: {value}}) => {
    setForm({
      ...form,
      city: value,
    });
    onNext();
  };

  const onNext = () => setCurrentStep(currentStep + 1);
  const onBack = () => setCurrentStep(currentStep - 1);

  const handleSelectAddress = (address) => {
    setForm({
      ...form,
      address,
    });
    onNext();
  };

  const onChangeAddress = (formData) => {
    setForm({
      ...form,
      address: formData,
    });
  };

  const onChangeForm = (formData) => {
    setForm({...form, ...formData});
    onNext();
  };

  const onAcceptAddress = () => {
    onNext();
  };

  const onSubmitNoSave = () => {
    const {address: addressObj = {}, description, name, type} = form;
    const {address, position = {}} = addressObj;
    if (onSaved) {
      onSaved({
        address,
        lat: position.lat,
        lng: position.lng,
        description,
        title: name,
        type,
      });
    }
  };

  const onSubmit = async () => {
    await saveAddress({
      form: {
        ...form,
        address: {
          ...form.address,
          address: `${form.address.address}, ${form.city}`,
        },
        addressId: isEditing ? defaultValues.id : null,
      },
      onSaved,
    });
    if (onClose) {
      onClose();
    }
  };

  const onChangePosition = (newPosition) => {
    const {address = {}} = form || {};
    setForm({
      ...form,
      address: {
        ...address,
        position: newPosition,
      },
    });
  };

  const {address, city} = form;
  const modeText = mode === 0 ? 'type' : 'my-location';
  const content = (
    <>
      <PermissionsManager permissions={[PERMISSIONS.ACCESS_LOCATION]}>
        <View style={classes.content}>
          {currentStep === 0 && (
            <AddressForm onChangeForm={onChangeForm} defaultValues={form} />
          )}
          {currentStep === 1 && (
            <ScrollView>
              <GCitySelect
                autoFocus
                label={_t('where_am_i_city_label')}
                placeholder={_t('where_am_i_city_placeholder')}
                searchPlaceholder={_t('where_am_i_city_info')}
                onChange={onSelectCity}
                defaultValue={city}
              />
            </ScrollView>
          )}
          {currentStep === 2 && (
            <EnterAddress
              citySelected={city}
              defaultValue={address}
              onGoBack={onBack}
              onAccept={onAcceptAddress}
              mode={mode}
              onChangeMode={onChangeMode}
              onSelectAddress={handleSelectAddress}
              onChangePosition={onChangePosition}
            />
          )}
          {currentStep === 3 && (
            <FixTheAddress
              mode={modeText}
              address={address}
              city={city}
              onChangeForm={onChangeAddress}
              onBack={onBack}
              onSubmitAddress={
                useWizard && !forceSave ? onSubmitNoSave : onSubmit
              }
            />
          )}
        </View>
      </PermissionsManager>
      {loading && <LoadingCurtain />}
    </>
  );

  if (useDialog) {
    return (
      <WizardDialog open={open} onClose={onClose}>
        {content}
      </WizardDialog>
    );
  }

  return content;
};

const styles = () => ({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default AddressWizard;

import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import useTranslation from 'hooks/useTranslation';
import useStyles from 'shared/hooks/use-styles';
import GCitySelect from 'shared/components/base/controls/g-city-select';
import EnterAddress from 'shared/components/base/address-wizard/EnterAddress';
import Text from 'components/base/text';
import FixTheAddress from 'shared/components/address-suggester/FixTheAddress';
import AddressForm from './AddressForm';
import {useMutation} from '@apollo/react-hooks';
import {SAVE_ADDRESS} from './queries';
import {useSession} from 'hooks/index';
import useNotify from 'hooks/useNotification';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';

const AddressWizard = ({onSaved}) => {
  const [classes] = useStyles(styles);
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState(0);
  const {error, success} = useNotify();
  const [form, setForm] = useState({
    address: null,
    type: null,
    name: null,
    description: null,
    city: '',
  });
  const {
    stack: {client = {}, locale, myAddresses = []},
    setKey,
  } = useSession();
  const [saveAddress, {loading}] = useMutation(SAVE_ADDRESS);
  const {_t} = useTranslation();

  const onChangeMode = newMode => {
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

  const handleSelectAddress = address => {
    setForm({
      ...form,
      address,
    });
    onNext();
  };

  const onChangeAddress = formData => {
    setForm({
      ...form,
      address: formData,
    });
  };

  const onChangeForm = formData => {
    setForm({...form, ...formData});
    onNext();
  };

  const onSubmit = async () => {
    try {
      const {address: addressObj = {}, name, type} = form;
      const {address, position = {}} = addressObj;
      const {data} = await saveAddress({
        variables: {
          address,
          client: client.id,
          buildingType: type,
          title: name,
          isMain: 1,
          lat: position.lat,
          lng: position.lng,
          locale,
        },
      });
      if (data.response) {
        await setKey('myAddresses', [...myAddresses, data.response]);
        success(_t('address_saved_message'));
        if (onSaved) {
          onSaved();
        }
      } else {
        error('Could not save the address');
        console.log('Error: while saving the address');
      }
    } catch (e) {
      // Todo: translate this error
      error(_t('address_error_message'));
      console.log('Error: ', e);
    }
  };

  const {address, city} = form;
  const modeText = mode === 0 ? 'type' : 'my-location';
  return (
    <>
      <View style={classes.content}>
        {currentStep === 0 && <AddressForm onChangeForm={onChangeForm} />}
        {currentStep === 1 && (
          <ScrollView>
            <GCitySelect
              autoFocus
              label={_t('where_am_i_city_label')}
              placeholder={_t('where_am_i_city_placeholder')}
              onChange={onSelectCity}
              value={city}
            />
            <View style={classes.caption}>
              <Text style={classes.captionText} variant="caption">
                {_t('where_am_i_city_info')}
              </Text>
            </View>
          </ScrollView>
        )}
        {currentStep === 2 && (
          <EnterAddress
            citySelected={city}
            onGoBack={onBack}
            mode={mode}
            onChangeMode={onChangeMode}
            onSelectAddress={handleSelectAddress}
          />
        )}
        {currentStep === 3 && (
          <FixTheAddress
            mode={modeText}
            address={address}
            city={city}
            onChangeForm={onChangeAddress}
            onSubmitAddress={onSubmit}
          />
        )}
      </View>
      {loading && <LoadingCurtain />}
    </>
  );
};

const styles = () => ({
  caption: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  captionText: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default AddressWizard;

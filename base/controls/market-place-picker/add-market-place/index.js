import React, {useState} from 'react';
import Dialog from 'shared/components/dialogs/dialog';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import ShopperNeedsHorizontal from 'shared/components/base/controls/shopper-needs-horizontal';
import NationalitySelect from 'shared/components/base/controls/nationality-select';
import useForm from 'hooks/useForm';
import {isEmpty} from 'shared/utils/functions';
import CitySelect from 'shared/components/base/controls/city-select';
import TextField from 'shared/components/base/controls/text-field';
import TextArea from 'shared/components/base/controls/text-area';
import {ScrollView} from 'shared/components/commons';
import MapPicker from 'shared/components/base/controls/map-picker';
import Button from 'shared/components/base/buttons/button';
import RequiredLabel from 'shared/components/base/commons/RequiredLabel';
import {useSaveMarketPlace} from '../hooks';

const AddMarketPlace = ({open, onClose, onSaved}) => {
  const [classes] = useStyles(styles);
  const [selectedCity, setSelectedCity] = useState(null);
  const {saveMarket, loading} = useSaveMarketPlace();
  const {form = {}, isValid, onChange} = useForm(
    {
      address: null,
      country: 48,
      city: null,
      name: '',
      description: '',
    },
    {
      required: ['country', 'city', 'name'],
    },
  );
  const handleChangeCategories = ({target: {value}}) => {
    if (value.length >= 1) {
      setCategories(value);
    }
  };
  const handleChangeCity = (event) => {
    const {
      target: {item},
    } = event;
    onChange(event);
    setSelectedCity(item);
  };
  const getSelectedCity = () => {
    const parts = selectedCity.label.split(' (');
    return parts[0];
  };
  const handleSubmit = async () => {
    const {address, city, country, name, description} = form;
    await saveMarket({
      city,
      categories,
      name,
      address: address.address,
      lat: address.lat,
      lng: address.lng,
      description,
    });
    if (onSaved) {
      onSaved();
    }
  };
  const [categories, setCategories] = useState([]);
  const {address, city, country, name, description} = form;
  const formValid = isValid && categories.length > 0 && !isEmpty(address);
  console.log('Address: ', form);
  return (
    <Dialog
      loading={loading}
      title="add_market_place"
      contentStyles={classes.dialog}
      open={open}
      disableScroll
      onClose={onClose}>
      <ScrollView useKeyboard>
        <View style={classes.content}>
          <RequiredLabel />
          <ShopperNeedsHorizontal
            label="market_place_categories_label"
            required
            onChange={handleChangeCategories}
            value={categories}
          />
          <View style={classes.row}>
            <NationalitySelect
              required
              primary
              label={'market_place_country_label'}
              name="country"
              onChange={onChange}
              placeholder={'market_place_country_ph'}
              value={country}
            />
          </View>
          <View style={classes.row}>
            {!isEmpty(country) && (
              <CitySelect
                required
                country={country}
                primary
                label="market_place_city_label"
                placeholder="market_place_city_ph"
                name="city"
                onChange={handleChangeCity}
                value={city}
              />
            )}
          </View>
          {!isEmpty(city) && (
            <MapPicker
              primary
              required
              label={'market_place_address_label'}
              placeholder={'market_place_address_ph'}
              name="address"
              defaultQuery={getSelectedCity()}
              value={address}
              onChange={onChange}
            />
          )}
          <View style={classes.row}>
            <TextField
              required
              primary
              label="market_place_name_label"
              placeholder="market_place_name_ph"
              name="name"
              value={name}
              onChange={onChange}
            />
          </View>
          <View style={classes.row}>
            <TextArea
              primary
              label="market_place_description_label"
              placeholder="market_place_description_ph"
              name="description"
              value={description}
              onChange={onChange}
            />
          </View>
        </View>
      </ScrollView>
      <View style={classes.actions}>
        <Button disabled={!formValid} primary onPress={handleSubmit}>
          save_text
        </Button>
        <Button onPress={onClose}>cancel_text</Button>
      </View>
    </Dialog>
  );
};

export default AddMarketPlace;

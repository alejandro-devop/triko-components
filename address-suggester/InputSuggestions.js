import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import {TextField} from 'shared/components/base/controls';
import useUserLocation from 'hooks/useUserLocation';
import {LoadingCurtain} from 'main/components/base/dialogs';

import RNGooglePlaces from 'react-native-google-places';
import {isEmpty} from 'shared/utils/functions';
import AddressesList from './AddressesList';
import useNotify from 'hooks/useNotification';
import {getBoundsOfDistance} from 'geolib';
import useAddressFinder from 'hooks/useAddressFinder';
import AdvancedOptions from 'shared/components/address-suggester/AdvancedOptions';
import CircleButton from 'shared/components/base/buttons/circle-button';
import AddressFixer from 'shared/components/address-fixer';
import AddressMapPicker from 'shared/components/address-map-picker';

let timeout = null;
const MIN_CHARS = 6;

/**
 * This component allows to get address suggestions using the google api
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param label
 * @param onChange
 * @param placeholder
 * @param name
 * @param value
 * @param autoFocus
 * @returns {*}
 * @constructor
 */
const InputSuggestions = ({
  label,
  onChange,
  onSelectAddress,
  primary,
  placeholder,
  name,
  value = '',
  autoFocus,
}) => {
  const {error} = useNotify();
  const {loading: loadingLocation, location} = useUserLocation();
  const {getLocationInfo} = useAddressFinder();
  const [address, setAddress] = useState(value);
  const [loading, setLoading] = useState(false);
  const [addressInfo, setAddressInfo] = useState(null);
  const [locationInfo, setLocationInfo] = useState({});
  const [visibleAdvanced, setAdvancedOptions] = useState(false);
  const [visibleCurrentLocation, setVisibleCurrentLocation] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const toggleAdvancedOptions = () => setAdvancedOptions(!visibleAdvanced);
  const toggleCurrentLocation = () =>
    setVisibleCurrentLocation(!visibleCurrentLocation);
  const handleChange = ({target: {value: inputValue}}) => {
    setAddress(inputValue);
    setSelected(false);
    if (!selected) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getSuggestions(inputValue);
      }, 800);
    }
  };

  const getSuggestions = async userAddress => {
    if (userAddress.length < MIN_CHARS) {
      setSuggestions([]);
      return null;
    }
    setLoading(true);
    try {
      const {countryCode, country, lat, lng} = location;
      const [SW, NE] = getBoundsOfDistance(
        {latitude: lat, longitude: lng},
        50000,
      );
      const info = await getLocationInfo({lat, lng});
      const {city: defaultCity, department: defaultDepartment} = info;
      const {department: userDepartment, city: userCity} = locationInfo;
      const department = userDepartment || defaultDepartment;
      const city = userCity || defaultCity;
      let matches = await RNGooglePlaces.getAutocompletePredictions(
        `${country}, ${department}, ${city}, ${userAddress}`,
        {
          locationRestriction: {
            latitudeSW: SW.latitude,
            longitudeSW: SW.longitude,
            latitudeNE: NE.latitude,
            longitudeNE: NE.longitude,
          },
          latitude: lat,
          longitude: lng,
          radius: 200,
          types: ['geocode', 'street_address'],
          country: countryCode,
        },
      );
      const suggestedAddresses = matches
        .filter(item => !isEmpty(item.primaryText))
        .map(item => ({...item, department, country}));
      setSuggestions(suggestedAddresses);
      setSearched(true);
      if (!userDepartment && !userCity) {
        setLocationInfo({
          department,
          city,
        });
      }
    } catch (err) {
      console.log('Error: ', error);
      error('Error while fetching suggestions');
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleLocationInfoChange = ({target: {name, value}}) => {
    setLocationInfo({
      ...locationInfo,
      [name]: value,
    });
    clearTimeout(timeout);
    setSelected(false);
    timeout = setTimeout(() => {
      getSuggestions(address);
    }, 800);
  };

  const handleSelect = ({primaryText, secondaryText}) => {
    const addressInfo = {
      name,
      value: primaryText,
      primary: primaryText,
      secondary: secondaryText,
    };
    if (onChange) {
      onChange({
        target: addressInfo,
      });
    }
    setAddress(primaryText);
    setAddressInfo(addressInfo);
    setSuggestions([]);
    setSelected(true);
  };

  const clearSelected = () => {
    setAddress('');
    setSelected(null);
  };

  const onAcceptAddress = ({address: formattedAddress, location = {}}) => {
    const {lat, lng} = location;
    if (onSelectAddress) {
      onSelectAddress({
        address: `${formattedAddress}`,
        lat,
        lng,
      });
    }
  };

  return (
    <Wrapper
      selected={selected}
      searched={searched}
      visibleAdvanced={visibleAdvanced}
      visibleCurrentLocation={visibleCurrentLocation}
      toggleCurrentLocation={toggleCurrentLocation}
      toggleAdvanceOptions={toggleAdvancedOptions}>
      {loadingLocation && <LoadingCurtain />}
      {!selected && !visibleCurrentLocation && (
        <>
          {visibleAdvanced && !selected && (
            <AdvancedOptions
              city={locationInfo.city}
              department={locationInfo.department}
              onChange={handleLocationInfoChange}
            />
          )}
          <TextField
            disabled={selected}
            appendControl={
              selected && (
                <CircleButton onPress={clearSelected} size="sm" name="times" />
              )
            }
            label={label}
            value={address}
            onChange={handleChange}
            placeholder={placeholder}
            primary={primary}
            autoFocus={autoFocus}
          />
          {!selected && address.length >= MIN_CHARS && (
            <AddressesList
              addresses={suggestions}
              loading={loading}
              onSelect={handleSelect}
            />
          )}
        </>
      )}
      {selected && (
        <AddressFixer
          onSave={onAcceptAddress}
          address={addressInfo}
          onCancel={clearSelected}
        />
      )}
      {visibleCurrentLocation && (
        <AddressMapPicker
          onAccept={onAcceptAddress}
          onCancel={toggleCurrentLocation}
        />
      )}
    </Wrapper>
  );
};

InputSuggestions.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
};

export default InputSuggestions;

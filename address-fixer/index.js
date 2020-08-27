import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './styles';
import useStyles from 'shared/hooks/use-styles';
import useAddressLocation from 'hooks/useAddressLocation';
import CircularLoader from 'shared/components/loaders/circular-loader';
import MapFixer from './map-fixer';

/**
 * This component allows to fix the location for a given address text
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client
 * @param address
 * @param onCancel
 * @param onToggleEditing
 * @param onSave
 * @returns {*}
 * @constructor
 */
const AddressFixer = ({address = {}, onCancel, onToggleEditing, onSave}) => {
  const [classes] = useStyles(styles);
  const [editing, setEditing] = useState(false);
  const [displayAddress, setDisplayAddress] = useState(address.primary || '');
  const [location, setLocation] = useState(null);
  const {
    getAddressLocation,
    location: addressLocation = {},
    loading,
  } = useAddressLocation({});
  const toggleEditing = () => {
    if (onToggleEditing) {
      onToggleEditing(!editing);
    }
    setEditing(!editing);
  };
  const onLocationFound = (position, addressFound) => {
    setLocation(position);
    setDisplayAddress(addressFound);
  };
  const handleAccept = ({location: newLocation, address: newAddress}) => {
    setDisplayAddress(newLocation.address);
    setLocation(newLocation.location);
    onSave({location: newLocation, address: newAddress});
  };

  const handleCancel = () => {
    onCancel();
  };

  const identifyAddressLocation = async () => {
    const {position = {}} = await getAddressLocation(
      `${address.secondary}, ${address.primary}`,
    );
    setLocation(position);
  };

  useEffect(() => {
    identifyAddressLocation();
  }, []);

  return (
    <View style={classes.root}>
      {loading && (
        <View style={classes.loaderWrapper}>
          <CircularLoader />
        </View>
      )}
      {/*{!editing && (*/}
      {/*  <AddressDisplay*/}
      {/*    address={displayAddress}*/}
      {/*    addressObject={address}*/}
      {/*    defaultLocation={location}*/}
      {/*    onEdit={toggleEditing}*/}
      {/*    onLocationFound={onLocationFound}*/}
      {/*    onSave={handleSave}*/}
      {/*    onCancel={onCancel}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{editing && (*/}
      {!loading && location && (
        <MapFixer
          location={location || {}}
          address={displayAddress}
          onAccept={handleAccept}
          onCancel={handleCancel}
        />
      )}
      {/*)}*/}
    </View>
  );
};

AddressFixer.propTypes = {
  address: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
  onToggleEditing: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AddressFixer;

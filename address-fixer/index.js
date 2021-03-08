import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './styles';
import useStyles from 'shared/hooks/use-styles';
import useAddressLocation from 'shared/hooks/use-address-location';
import MapFixer from './map-fixer';
import LoaderScreen from 'shared/components/loaders/loader-screen';

/**
 * This component renders a map component to allow the user fix the address location.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.l0
 * @param addressObj
 * @param onPositionChange
 * @param city
 * @returns {*}
 * @constructor
 */
const AddressFixer = ({addressObj, onPositionChange, city}) => {
  const [classes] = useStyles(styles);
  const [position, setPosition] = useState(null);
  const {getCurrentPosition, notFound, loading} = useAddressLocation();

  const identifyAddressLocation = async () => {
    const positionInfo = await getCurrentPosition({
      addressQuery: addressObj.address,
      city,
    });
    setPosition(positionInfo);
  };

  useEffect(() => {
    identifyAddressLocation();
  }, []);
  return (
    <View style={classes.root}>
      {loading && (
        <View style={classes.loaderWrapper}>
          <LoaderScreen />
        </View>
      )}
      {!loading && !notFound && (
        <MapFixer location={position} updateAddress={onPositionChange} />
      )}
    </View>
  );
};

AddressFixer.defaultProps = {
  addressObj: {},
};

AddressFixer.propTypes = {
  // Object containing the address text information
  address: PropTypes.shape({
    primary: PropTypes.string, // A text given by google for the address as main result.
    secondary: PropTypes.string, // A secondary result text given by google for the address.
  }),
  city: PropTypes.string, // The name of the typed city by the user.
  onToggleEditing: PropTypes.func, // Function to be triggered by the user to edit the address.
  onSave: PropTypes.func, // Function triggered when the address is saved.
  onCancel: PropTypes.func, // Function triggered when the user press the cancel button.
};

export default AddressFixer;

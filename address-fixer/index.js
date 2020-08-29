import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './styles';
import useStyles from 'shared/hooks/use-styles';
import useAddressLocation from 'hooks/useAddressLocation';
import MapFixer from './map-fixer';
import LoaderScreen from 'shared/components/loaders/loader-screen';

const AddressFixer = ({addressObj = {}, onPositionChange, city}) => {
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

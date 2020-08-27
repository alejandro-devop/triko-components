import React from 'react';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import AddressItem from './AddressItem';
import CircularLoader from 'shared/components/loaders/circular-loader';
import useTranslation from 'hooks/useTranslation';

/**
 * This component renders the list of suggestions for directions.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param addresses
 * @param loading
 * @param onSelect
 * @returns {*}
 * @constructor
 */
const AddressesList = ({addresses = [], loading, onSelect}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      {loading && <CircularLoader />}
      {!loading && addresses.length === 0 && (
        <View style={classes.emptyWrapper}>
          <Text variant="caption" style={classes.emptyText}>
            {_t('address_suggester_label_empty')}
          </Text>
        </View>
      )}
      {!loading &&
        addresses.map((address, key) => (
          <AddressItem
            address={address}
            key={`address-sug-${key}`}
            onPress={() => onSelect(address)}
          />
        ))}
    </View>
  );
};

const styles = () => ({
  emptyWrapper: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
  },
  root: {
    paddingTop: 10,
    backgroundColor: '#FFF',
  },
});

export default AddressesList;

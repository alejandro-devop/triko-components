import React from 'react';
import {View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import Text from 'shared/components/base/text';
import CircleButton from 'shared/components/base/buttons/circle-button';
import useStyles from 'shared/hooks/use-styles';
import Button from 'shared/components/base/buttons/button';
import MapDisplay from 'shared/components/base/address-display';
import useTranslation from 'hooks/useTranslation';

const MyAddress = ({address, open, onClose, toggleForm}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableScroll
      contentStyles={classes.dialog}>
      {address && (
        <View style={classes.userAddressWrapper}>
          <MapDisplay address={address.address} location={address} />
          <View style={classes.userAddress}>
            <Text variant="caption" style={classes.addressTitle}>
              {_t('my_address_title')}
            </Text>
            <Text variant="subtitle" style={classes.address}>
              {address.address}
            </Text>
            <Button onPress={toggleForm} primary>
              {_t('change_address_button')}
            </Button>
          </View>
        </View>
      )}
      {!address && (
        <View style={classes.emptyWrapper}>
          <Text style={classes.emptyText} variant="caption">
            {_t('addresses_picker_empty_addresses_1')}
          </Text>
          <Text style={classes.emptyText} variant="caption">
            {_t('addresses_picker_empty_addresses_2')}
          </Text>
          <CircleButton name="plus" onPress={toggleForm} />
        </View>
      )}
    </Dialog>
  );
};

const styles = ({palette}) => ({
  dialog: {
    maxHeight: '90%',
    height: '80%',
  },
  address: {
    color: palette.blue,
  },
  userAddressWrapper: {
    flex: 4,
  },
  userAddress: {
    marginTop: 60,
    alignItems: 'center',
    flex: 2,
  },
  addressTitle: {},
  emptyWrapper: {
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default MyAddress;

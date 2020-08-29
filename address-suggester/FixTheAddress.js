import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import TextField from 'components/base/controls/text-field';
import Text from 'components/base/text';
import IconButton from 'components/base/buttons/icon-button';
import AddressFixer from 'shared/components/address-fixer';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';
import Button from 'shared/components/base/buttons/button';

const FixTheAddress = ({
  address: addressObj = {},
  city,
  onChangeForm,
  onSubmitAddress,
}) => {
  const [editing, setEditing] = useState(false);
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);
  const {address} = addressObj;
  const toggleEditing = () => setEditing(!editing);
  const handleOnChangeAddress = ({target: {value: addressText}}) => {
    if (onChangeForm) {
      onChangeForm({
        ...addressObj,
        address: addressText,
      });
    }
  };

  const onPositionChange = newPosition => {
    if (onChangeForm) {
      onChangeForm({
        ...addressObj,
        position: newPosition,
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={classes.text}>
        {editing && (
          <TextField
            label={_t('edit_address_text')}
            onChange={handleOnChangeAddress}
            value={address}
            primary
          />
        )}
        {!editing && (
          <View style={classes.addressHolder}>
            <Text style={classes.addressText}>{address}</Text>
            <IconButton
              name="pen"
              iconStyles={classes.icon}
              onPress={toggleEditing}
            />
          </View>
        )}
        <AddressFixer
          addressObj={addressObj}
          city={city}
          onPositionChange={onPositionChange}
        />
        <View style={classes.bottomRow}>
          <Button onPress={onSubmitAddress} secondary>
            {_t('done_text')}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = ({palette}) => ({
  addressHolder: {
    backgroundColor: palette.blueLight,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: palette.blue,
  },
  bottomRow: {
    marginTop: 10,
  },
  icon: {
    color: palette.blue,
  },
});

export default FixTheAddress;

import React, {useState} from 'react';
import {View} from 'react-native';
import TextField from 'components/base/controls/text-field';
import Text from 'components/base/text';
import IconButton from 'components/base/buttons/icon-button';
import AddressFixer from 'shared/components/address-fixer';
import {useStyles} from '@triko-app/hooks';
import useTranslation from 'shared/hooks/use-translate';

const FixFromMap = ({addressObj, onChangeForm, city}) => {
  const [classes] = useStyles(styles);
  const [editing, setEditing] = useState(false);
  const {address} = addressObj;
  const {_t} = useTranslation();
  const toggleEditing = () => setEditing(!editing);
  const handleOnChangeAddress = ({target: {value: addressText}}) => {
    if (onChangeForm) {
      onChangeForm({
        ...addressObj,
        address: addressText,
      });
    }
  };

  const onPositionChange = (newPosition) => {
    if (onChangeForm) {
      onChangeForm({
        ...addressObj,
        position: newPosition,
      });
    }
  };
  return (
    <>
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
    </>
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
  icon: {
    color: palette.blue,
  },
});

export default FixFromMap;

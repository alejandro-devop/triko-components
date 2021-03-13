import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import useAddressFinder from 'shared/hooks/use-address-finder';
import TextField from 'components/base/controls/text-field';
import Text from 'components/base/text';
import Label from 'components/base/label';
import Button from 'components/base/buttons/button';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';

const FixFromMap = ({position, confirmAddress, onSubmit}) => {
  const [classes] = useStyles(styles);
  const [editing, setEditing] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const {_t} = useTranslation();
  const {locationInfo = {}, getLocationInfo, loading} = useAddressFinder();
  const {address = '', city = '', department = '', country = ''} = locationInfo;
  const fullAddress = `${city}, ${department}, ${country}, ${address}`;

  const toggleEdit = () => {
    setAddressValue(address);
    changeAddress(address);
    setEditing(!editing);
  };

  const onChangeAddress = ({target: {value}}) => {
    setAddressValue(value);
    changeAddress(`${value}, ${city}, ${department}, ${country}`);
  };

  const changeAddress = (value) =>
    confirmAddress({
      address: value,
      position,
    });

  const fetchUserLocation = async () => {
    const location = await getLocationInfo(position);
    changeAddress(
      `${location.address}, ${location.city}, ${location.department}, ${location.country}`,
    );
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <>
      {!editing && (
        <>
          <Text style={classes.foundText}>
            {_t('address_found_for_selected_location')}
          </Text>
          <View style={classes.addressDisplayWrapper}>
            <Text style={classes.addressText}>{fullAddress}</Text>
          </View>
          <Label>{_t('address_confirm_or_update_label')}</Label>
          <View style={classes.actions}>
            <Button secondary icon="check" onPress={onSubmit}>
              {_t('use_this_address_text')}
            </Button>
            <Button icon="pen" onPress={toggleEdit}>
              {_t('edit_this_address_text')}
            </Button>
          </View>
        </>
      )}
      {editing && (
        <View style={classes.editingForm}>
          <TextField
            label={_t('edit_address_text')}
            primary
            onChange={onChangeAddress}
            value={addressValue}
          />
          <Text
            autoFocus
            style={classes.editCaption}
            variant="caption">{`${city}, ${department}, ${country}`}</Text>
          <View style={classes.editActions}>
            <Button primary icon="check" onPress={onSubmit}>
              {_t('use_this_address_confirm_text')}
            </Button>
          </View>
        </View>
      )}
      {loading && <LoadingCurtain disableModal />}
    </>
  );
};

const styles = ({palette}) => ({
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  addressText: {
    fontSize: 18,
    textAlign: 'center',
  },
  addressDisplayWrapper: {
    paddingVertical: 20,
    marginTop: 10,
    backgroundColor: palette.blueLight,
    paddingHorizontal: 15,
    borderRadius: 40,
  },
  editActions: {
    marginTop: 20,
    alignItems: 'center',
  },
  editCaption: {
    textAlign: 'center',
  },
  editingForm: {
    marginBottom: 10,
  },
  foundText: {
    textAlign: 'center',
    color: palette.blue,
  },
  root: {},
});

export default FixFromMap;

import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import InputControl from 'shared/components/base/controls/input-control';
import AddressSuggestions from './AddressSuggestions';
import WarningMessage from 'shared/components/messages/WarningMessage';
import useTranslation from 'hooks/useTranslation';

const AddressSuggester = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon = 'map-marker',
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const {_t} = useTranslation();
  const toggleDialog = () => setOpenDialog(!openDialog);
  const isIos = Platform.OS === 'ios'
  const [visible, setVisible] = useState(isIos);
  const handleSelect = address => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: address,
        },
      });
    }
    toggleDialog();
  };
  const checkLocationAvailability = async () => {
    try {
      const data = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded(
        {
          interval: 10000,
          fastInterval: 5000,
        },
      );
      if (data === 'enabled') {
        setVisible(true);
      } else {
        setVisible(true);
      }
    } catch (e) {
      console.log('Error: ', e);
      setVisible(false);
    }
  };

  useEffect(() => {
    if (!isIos) {
      checkLocationAvailability();
    }
  }, []);

  return (
    <>
      <InputControl
        onPress={toggleDialog}
        label={label}
        placeholder={placeholder}
        icon={icon}
        value={value}
      />
      {!visible && <WarningMessage text={_t('enable_gps_label')} />}
      {visible && (
        <AddressSuggestions
          onSelectAddress={handleSelect}
          open={openDialog}
          onClose={toggleDialog}
        />
      )}
    </>
  );
};

export default AddressSuggester;

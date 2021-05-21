import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import SwitchButton from 'shared/components/base/controls/switch-button';
import useTranslation from 'shared/hooks/use-translate';

const Options = ({value, onChange}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const handleChange = ({target: {value: newValue}}) => onChange(newValue);
  return (
    <View style={classes.root}>
      <SwitchButton
        buttons={['enter_my_address_text', 'use_my_current_location_text']}
        label={_t('enter_address_method')}
        value={value}
        onChange={handleChange}
      />
    </View>
  );
};

const styles = () => ({
  root: {},
});

export default Options;

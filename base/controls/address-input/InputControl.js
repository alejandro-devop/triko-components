import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {TextField} from 'shared/components/base/controls';
import IconButton from 'shared/components/base/buttons/icon-button';
import useStyles from 'shared/hooks/use-styles';
import ConfirmSlide from 'components/base/confirm-slide';
import useTranslation from 'shared/hooks/use-translate';

/**
 * This component displays teh selected address by the user.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param askSaveAddress
 * @param error
 * @param label
 * @param disabled
 * @param required
 * @param onAcceptSave
 * @param onCancelSave
 * @param onPress
 * @param placeholder
 * @param secondary
 * @param value
 * @returns {*}
 * @constructor
 */
const InputControl = ({
  askSaveAddress,
  onCancelSave,
  onAcceptSave,
  error,
  disabled,
  label,
  onPress,
  placeholder,
  required,
  secondary,
  value = {},
}) => {
  const {title, address} = value || {};
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <TextField
        disabled={disabled}
        primary
        secondary={secondary}
        addOn={
          <IconButton disabled={disabled} onPress={onPress} name="map-marker" />
        }
        value={address ? `${title || ''} (${address})` : null}
        error={error}
        label={label}
        onlyMask
        onPress={onPress}
        placeholder={placeholder}
        required={required}
      />
      {askSaveAddress && (
        <ConfirmSlide
          onCancel={onCancelSave}
          onAccept={onAcceptSave}
          message={_t('wanna_save_this_address')}
          buttonSize="sm"
        />
      )}
    </View>
  );
};

InputControl.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.shape({
    title: PropTypes.string,
    address: PropTypes.string,
  }),
};

const styles = () => ({
  root: {
    // paddingHorizontal: 20,
  },
});

export default InputControl;

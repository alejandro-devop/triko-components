import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import AddressSuggester from 'shared/components/address-suggester';
import Button from 'components/base/buttons/button';
import useTranslation from 'shared/hooks/use-translate';
import useStyles from 'hooks/useStyles';
import Dialog from 'components/base/dialogs/dialog';
import styles from './styles';
import PermissionsManager, {
  PERMISSIONS,
} from 'components/base/permissions-manager';

/**
 * This component renders and handles the new address form.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client
 * @param form
 * @param loading
 * @param onChange
 * @param onCancel
 * @param onNext
 * @param isValid
 * @param withDialog
 * @returns {*}
 * @constructor
 */
const AddressForm = ({
  isValid,
  form = {},
  loading,
  onChange,
  onCancel,
  onNext,
  withDialog,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {address} = form;
  const content = (
    <View style={classes.root}>
      <AddressSuggester
        label={_t('address_manager_label_address')}
        placeholder={_t('address_manager_ph_address')}
        primary
        onChange={onChange}
        name="address"
        value={address}
      />
      <View style={classes.row}>
        <View style={classes.buttonRow}>
          <Button primary onPress={onNext} disabled={!isValid}>
            {_t('address_manager_next_button')}
          </Button>
          <Button onPress={onCancel}>
            {_t('address_manager_cancel_button')}
          </Button>
        </View>
      </View>
    </View>
  );
  return withDialog ? (
    <Dialog
      disableScroll
      contentStyles={classes.dialog}
      loading={loading}
      onClose={onCancel}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PermissionsManager permissions={[PERMISSIONS.ACCESS_LOCATION]}>
          {content}
        </PermissionsManager>
      </ScrollView>
    </Dialog>
  ) : (
    content
  );
};

AddressForm.propTypes = {
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onNext: PropTypes.func,
};

export default AddressForm;

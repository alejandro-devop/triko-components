import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {ScrollView} from 'shared/components/commons';
import HomePickerType from 'shared/components/base/home-type-picker';
import useTranslation from 'shared/hooks/use-translate';
import TextField from 'shared/components/base/controls/text-field';
import Button from 'shared/components/base/buttons/button';
import {useStyles} from '@triko-app/hooks';
import useForm from 'shared/hooks/use-form';
import {isEmpty} from 'shared/utils/functions';
import styles from './styles';

/**
 * Component to render and handle the address form.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param defaultValues
 * @param onChangeForm
 * @returns {*}
 * @constructor
 */
const AddressForm = ({defaultValues, onChangeForm}) => {
  const {_t} = useTranslation();
  const {form, onChange} = useForm(defaultValues);
  const [classes] = useStyles(styles);
  const {name, type, description} = form;
  const isValid = !isEmpty(name) && !isEmpty(type);
  const onSubmitForm = () => {
    if (onChangeForm) {
      onChangeForm({
        ...form,
      });
    }
  };

  return (
    <ScrollView useKeyboard>
      <HomePickerType
        label={_t('address_manager_label_type')}
        name="type"
        value={type}
        onChange={onChange}
      />
      <TextField
        label={_t('address_manager_label_name')}
        autoCorrect={false}
        primary
        placeholder={_t('address_manager_label_name_ph')}
        name="name"
        onChange={onChange}
        value={name}
      />
      <TextField
        label={_t('address_manager_label_description')}
        autoCorrect={false}
        primary
        placeholder={_t('address_manager_ph_description')}
        name="description"
        onChange={onChange}
        value={description}
      />
      <View style={classes.buttonRow}>
        <Button primary onPress={onSubmitForm} disabled={!isValid}>
          {_t('address_manager_next_button')}
        </Button>
      </View>
    </ScrollView>
  );
};

AddressForm.defaultProps = {
  defaultValues: {type: null, name: null, description: null},
};

AddressForm.propTypes = {
  defaultValues: PropTypes.shape({
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Type of address selected
    name: PropTypes.string, // The address given name
    description: PropTypes.string, // The description given by the user.
  }),
};

export default AddressForm;

import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import HomePickerType from 'shared/components/base/home-type-picker';
import useTranslation from 'hooks/useTranslation';
import TextField from 'shared/components/base/controls/text-field';
import Button from 'shared/components/base/buttons/button';
import useStyles from 'shared/hooks/use-styles';
import useForm from 'hooks/useForm';
import {isEmpty} from 'shared/utils/functions';

const AddressForm = ({
  onChangeForm,
  defaultValues = {type: null, name: null, description: null},
}) => {
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

const styles = () => ({
  buttonRow: {
    marginTop: 20,
  },
});

export default AddressForm;

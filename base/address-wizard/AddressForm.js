import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HomePickerType from 'components/base/home-type-picker';
import useTranslation from 'hooks/useTranslation';
import {TextField} from 'components/base/controls';
import Button from 'shared/components/base/buttons/button';
import useStyles from 'shared/hooks/use-styles';
import useForm from 'hooks/useForm';
import {isEmpty} from 'shared/utils/functions';

const AddressForm = ({onChangeForm}) => {
  const {_t} = useTranslation();
  const {form, onChange} = useForm({
    type: null,
    name: null,
    description: null,
  });
  const [classes] = useStyles(styles);
  const {name, type, description} = form;
  const isValid = !isEmpty(name) && !isEmpty(type) && !isEmpty(description);
  const onSubmitForm = () => {
    if (onChangeForm) {
      onChangeForm({
        ...form,
      });
    }
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid>
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
    </KeyboardAwareScrollView>
  );
};

const styles = () => ({
  buttonRow: {
    marginTop: 20,
  },
});

export default AddressForm;

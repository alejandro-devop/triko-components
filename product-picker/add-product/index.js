import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import TextField from 'shared/components/base/controls/text-field';
import TextArea from 'shared/components/base/controls/text-area';
import Button from 'shared/components/base/buttons/button';
import useForm from 'hooks/useForm';
import {LoadingCurtain} from 'components/base/dialogs';
import {useSaveProduct} from '../hooks';

const AddProduct = ({
  market = {},
  defaultName,
  categories = [],
  onSaved,
  onCancel,
}) => {
  const [classes] = useStyles(styles);
  const {loading, saveProduct} = useSaveProduct();
  const {form = {}, isValid, onChange} = useForm(
    {
      name: defaultName,
      description: '',
    },
    {
      required: ['name'],
    },
  );
  const handleSave = async () => {
    await saveProduct({
      categories: categories.map((item) => item.id),
      market,
      name,
      description,
    });
    if (onSaved) {
      onSaved();
    }
  };
  const {name, description} = form;
  return (
    <View style={classes.root}>
      <TextField
        primary
        label="product_name_label"
        placeholder="product_name_placeholder"
        name="name"
        value={name}
        onChange={onChange}
      />
      <View style={classes.actions}>
        <Button disabled={!isValid} onPress={handleSave} primary>
          save_text
        </Button>
        <Button secondary onPress={onCancel}>
          cancel_text
        </Button>
      </View>
      {loading && <LoadingCurtain disableModal />}
    </View>
  );
};

export default AddProduct;

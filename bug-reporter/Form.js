import React, {useState} from 'react';
import {View} from 'react-native';
import TextArea from 'components/base/controls/text-area';
import EmailField from 'components/base/controls/email-field';
import PhoneField from 'components/base/controls/phone-field';
import {formStyles as styles} from './styles';
import useStyles from 'shared/hooks/use-styles';
import Button from 'components/base/buttons/button';
import Icon from 'components/base/icon';
import {isEmpty} from 'utils/functions';

const defaultValues = {
  email: '',
  phonenumber: '',
  description: '',
};

/**
 * This component allows to handle the form to report bugs.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0
 */
const Form = ({onSubmit}) => {
  const [classes] = useStyles(styles);
  const [formValues, setFormValues] = useState(defaultValues);
  const {email, phonenumber, description} = formValues;
  const onChange = ({target: {value, name}}) =>
    setFormValues({...formValues, [name]: value});
  const isFormValid = () => {
    return !isEmpty(email) && !isEmpty(phonenumber) && !isEmpty(description);
  };
  return (
    <View style={classes.root}>
      <EmailField
        label="Contact E-mail"
        name="email"
        onChange={onChange}
        value={email}
        primary
      />
      <PhoneField
        label="Cellphone number"
        name="phonenumber"
        onChange={onChange}
        value={phonenumber}
        primary
      />
      <TextArea
        label="What happened?"
        name="description"
        onChange={onChange}
        value={description}
        primary
      />
      <View style={classes.buttonWrapper}>
        <Button
          onPress={() => onSubmit(formValues)}
          primary
          disabled={!isFormValid()}>
          Send <Icon name="paper-plane" size={20} style={classes.icon} />
        </Button>
      </View>
    </View>
  );
};

export default Form;

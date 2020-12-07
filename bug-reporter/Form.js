import React, {useState} from 'react';
import {View} from 'react-native';
import TextArea from 'components/base/controls/text-area';
import EmailField from 'components/base/controls/email-field';
import PhoneField from 'components/base/controls/phone-field';
import {formStyles as styles} from './styles';
import useStyles from 'shared/hooks/use-styles';
import Button from 'components/base/buttons/button';
import SuccessMessage from 'shared/components/messages/SuccessMessage';
import {isEmpty} from 'utils/functions';
import useNavigate from 'shared/hooks/use-navigate';

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
const Form = ({onSubmit, saved}) => {
  const [classes] = useStyles(styles);
  const [formValues, setFormValues] = useState(defaultValues);
  const {navigation} = useNavigate();
  const {email, phonenumber, description} = formValues;
  const onChange = ({target: {value, name}}) =>
    setFormValues({...formValues, [name]: value});
  const isFormValid = () => {
    return !isEmpty(email) && !isEmpty(phonenumber) && !isEmpty(description);
  };
  const handleBack = () => {
    navigation.goBack();
  };
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formValues);
    }
  };
  return (
    <View style={classes.root}>
      {!saved && (
        <>
          <TextArea
            label="bug_reporter_description"
            name="description"
            onChange={onChange}
            value={description}
            primary
          />
          <EmailField
            label="bug_reporter_email"
            name="email"
            onChange={onChange}
            value={email}
            primary
          />
          <PhoneField
            label="bug_reporter_number"
            name="phonenumber"
            onChange={onChange}
            value={phonenumber}
            primary
          />
          <View style={classes.buttonWrapper}>
            <Button onPress={handleSubmit} primary disabled={!isFormValid()}>
              send_text
            </Button>
            <Button onPress={handleBack} secondary>
              back_text
            </Button>
          </View>
        </>
      )}
      {saved && (
        <View style={classes.successWrapper}>
          <SuccessMessage text="bug_report_send" />
          <View style={classes.actions}>
            <Button secondary onPress={handleBack}>
              back_text
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default Form;

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import useStyles from 'hooks/useStyles';
import TextField from 'components/base/controls/text-field';
import Text from 'shared/components/base/text';
import CircleButton from 'components/base/buttons/circle-button';
import classNames from 'utils/classnames';
import {isEmpty} from 'utils/functions';
import useTranslation from 'hooks/useTranslation';
import styles from './styles';

/**
 * This component renders the text box control for sending messages
 * @param trikoName
 * @param onSendMessage
 * @returns {*}
 * @constructor
 */
const TextBoxWrapper = ({trikoName, onSendMessage}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const [message, setMessage] = useState('');
  const send = () => {
    onSendMessage(message);
    setMessage('');
  };
  const content = (
    <View style={classNames({root: true}, [classes])}>
      <View style={classes.textWrapper}>
        <TextField
          onChange={({target: {value}}) => setMessage(value)}
          value={message}
          primary
          placeholder={_t('chat_message_placeholder', {name: trikoName})}
          onSubmit={() => (!isEmpty(message) ? send() : null)}
        />
      </View>
      <View style={classes.buttonWrapper}>
        <CircleButton
          disabled={isEmpty(message)}
          onPress={send}
          primary
          name="telegram-plane"
        />
      </View>
    </View>
  );
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.select({ios: 10})}>
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );
};

TextBoxWrapper.propTypes = {
  trikoName: PropTypes.string,
  onSendMessage: PropTypes.func,
};

export default TextBoxWrapper;

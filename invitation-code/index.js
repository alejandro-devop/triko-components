import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import Text from 'shared/components/base/text';
import CircleButton from 'components/base/buttons/circle-button';
import Button from 'shared/components/base/buttons/button';
import TextField from 'shared/components/base/controls/text-field';
import {LoadingCurtain} from 'components/base/dialogs';
import useUserUpdate from 'shared/hooks/use-user-update';
import useErrorReporter from 'shared/hooks/use-error-reporter';

/**
 * Component  to enter the invitation code
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param open
 * @param onClose
 * @returns {*}
 * @constructor
 */
const InvitationCode = ({open, onClose}) => {
  const [classes] = useStyles(styles);
  const [code, setCode] = useState('');
  const [isInvited, setIsInvited] = useState(false);
  const reportError = useErrorReporter({
    path: 'src/main/components/client-wizard/invitation-code/index.js',
  });
  const {loading, updateUser} = useUserUpdate();

  /**
   * Function to mark the user as  not invited.
   * @returns {Promise<void>}
   */
  const handleNoInvited = async () => {
    try {
      await updateUser({
        attrs: {
          noInvitation: true,
        },
      });
    } catch (e) {
      reportError(e, {
        code: 'TK-000014',
        message: 'Error while updating user invitation code',
      });
    }
    onClose();
  };

  /**
   * Function to  send  the invitation code to  the api.
   * @returns {Promise<void>}
   */
  const handleSendCode = async () => {
    try {
      await updateUser({
        attrs: {
          invitedBy: code,
        },
      });
      onClose();
    } catch (e) {
      reportError(e, {
        code: 'TK-000014',
        message: 'Error while updating user invitation code',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="invitation_code_title">
      {!isInvited && (
        <>
          <Text style={classes.text}>
            did_you_received_the_invitation_from_a_friend
          </Text>
          <View style={classes.actions}>
            <CircleButton
              label="yes_text"
              name="check"
              primary
              onPress={() => setIsInvited(true)}
            />
            <CircleButton
              onPress={handleNoInvited}
              label="no_text"
              name="times"
            />
          </View>
        </>
      )}
      {isInvited && (
        <View style={classes.content}>
          <View style={classes.inputWrapper}>
            <TextField
              primary
              label={'enter_invitation_code'}
              onChange={({target: {value}}) => setCode(value)}
              style={classes.textField}
            />
          </View>
          <View style={classes.actionButtons}>
            <Button
              onPress={handleSendCode}
              disabled={code.length === 0}
              secondary>
              send_text
            </Button>
            <Button onPress={onClose}>cancel_text</Button>
          </View>
        </View>
      )}
      {loading && <LoadingCurtain disableModal />}
    </Dialog>
  );
};

InvitationCode.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default InvitationCode;

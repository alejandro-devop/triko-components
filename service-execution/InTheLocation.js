import React, {useState} from 'react';
import ControlButton from './control-button';
import {View} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import useNotify from 'hooks/useNotification';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
import {
  STATUS_CONFIRM_START,
  STATUS_ON_YOUR_DOOR,
} from 'config/request-statuses';
import Label from 'components/base/label';
import useStyles from 'hooks/useStyles';
import {UPDATE_REQUEST} from 'components/pending-services-/queries';
import useSession from 'hooks/useSession';
import useTranslation from 'hooks/useTranslation';

const InTheLocation = ({request = {}}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const [sending, setSending] = useState(false);
  const [updateRequest, {loading}] = useMutation(UPDATE_REQUEST);
  const {transition = {}, client = {}, history = []} = request;
  const {
    stack: {user = {}},
  } = useSession();
  const confirmTransition = history.find(
    item => item.transition.workflow === STATUS_CONFIRM_START,
  );
  const {pi = {}} = client;
  const {first_name: clientName} = pi;
  const {workflow} = transition;
  const {error} = useNotify();
  const sendUpdate = async () => {
    setSending(true);
    try {
      await updateRequest({
        variables: {
          request: request.id,
        },
      });
      setSending(false);
    } catch (e) {
      console.log('Error: ', error);
      error('Error while saving the transition');
      setSending(false);
    }
  };
  const triggered = confirmTransition && confirmTransition.user === user.id;
  return (
    <>
      {loading && <LoadingCurtain />}
      {((!triggered && workflow === STATUS_ON_YOUR_DOOR) ||
        (!triggered && workflow === STATUS_CONFIRM_START)) && (
        <ControlButton
          disabled={sending}
          onPress={sendUpdate}
          percentage={100}
          label={_t('service_execution_start_service')}
          icon="play"
          disableGuide={workflow === STATUS_CONFIRM_START}
        />
      )}
      {triggered && workflow === STATUS_CONFIRM_START && (
        <View style={classes.labelWrapper}>
          <Label>
            {_t('service_execution_wait_for_client', {name: clientName})}
          </Label>
        </View>
      )}
    </>
  );
};

const styles = {
  labelWrapper: {
    marginTop: 30,
  },
};

export default InTheLocation;

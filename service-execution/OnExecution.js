import React, {useState} from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import ControlButton from './control-button';
import useTimer from 'shared/hooks/use-timer';
import Button from 'components/base/buttons/button';
import useStyles from 'hooks/useStyles';
import {useMutation} from '@apollo/react-hooks';
import useNotify from 'shared/hooks/use-notification';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
import {STATUS_CONFIRM_FINISHED, STATUS_STARTED} from 'config/request-statuses';
import {getElapsedTime} from 'utils/functions';
import {UPDATE_REQUEST} from 'components/pending-services-/queries';
import useSession from 'hooks/useSession';
import useTranslation from 'shared/hooks/use-translate';
import InfoMessage from 'components/base/messages/InfoMessage';

const OnExecution = ({request = {}}) => {
  const [classes] = useStyles(styles);
  const [updateRequest, {loading}] = useMutation(UPDATE_REQUEST);
  const {
    stack: {user = {}},
  } = useSession();
  const [sending, setSending] = useState(false);
  const {_t} = useTranslation();
  const {error} = useNotify();
  const {duration = 1, transition = {}, history = []} = request;
  const lastTransition = history.find(
    item => item.transition.workflow === STATUS_STARTED,
  );
  const finishTransition = history.find(
    item => item.transition.workflow === STATUS_CONFIRM_FINISHED,
  );
  const timeInfo = getElapsedTime(lastTransition.created_at, null, true);
  const {hours = 0, minutes = 0, seconds = 0} = timeInfo;
  const {formatted, finished, leftTimeFormatted, elapsed} = useTimer({
    hours,
    minutes,
    seconds,
    duration,
  }); // Send initial values to the timer
  // First we transform the duration into seconds
  const totalSeconds = duration * 60 * 60;
  // Then we calculate the percentage based on the elapsed time.
  const percentage = 100 - (elapsed * 100) / totalSeconds;
  const finishService = async () => {
    setSending(true);
    try {
      await updateRequest({
        variables: {
          request: request.id,
        },
      });
      setSending(false);
    } catch (e) {
      console.log('Error: ', e);
      error('Error while updating the request');
      setSending(false);
    }
  };
  const triggered =
    transition.workflow === STATUS_CONFIRM_FINISHED &&
    finishTransition.user === user.id;
  return (
    <>
      {loading && <LoadingCurtain />}
      <View style={classes.root}>
        <ControlButton percentage={Math.round(percentage)} disableGuide>
          {<Text>{leftTimeFormatted}</Text>}
        </ControlButton>
        {finished && transition.workflow === STATUS_STARTED && (
          <View style={classes.timesUpWrapper}>
            <InfoMessage text={_t('service_execution_times_over')} />
          </View>
        )}
        <View style={classes.actionButton}>
          {!triggered && (
            <Button primary onPress={finishService} disabled={sending}>
              {_t(
                transition.workflow === STATUS_STARTED
                  ? 'service_execution_end_service'
                  : 'service_execution_confirm_end',
              )}
            </Button>
          )}
          {triggered && (
            <Text style={classes.finishText}>
              {_t('service_execution_confirm_end_user')}
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

const styles = ({palette}) => ({
  root: {
    backgroundColor: '#FFF',
  },
  timesUpWrapper: {
    paddingHorizontal: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  finishText: {
    textAlign: 'center',
    color: palette.blue,
  },
});

export default OnExecution;

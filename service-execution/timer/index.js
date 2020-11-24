import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import Text from 'shared/components/base/text';
import styles from './styles';
import {getElapsedTime} from 'shared/utils/functions';
import {STATUS_STARTED} from 'config/request-statuses';
import useTimer from 'hooks/useTimer';
import useTranslation from 'hooks/useTranslation';
import BorderedButton from 'shared/components/base/buttons/bordered-button';

const ExecutionTimer = ({
  onPressFinish,
  hideDuration,
  isTriko,
  request = {},
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {history, duration} = request;
  const startedTransition = history.find(
    ({transition = {}}) => transition.workflow === STATUS_STARTED,
  );
  const timeInfo = getElapsedTime(startedTransition.created_at, null, true);
  const {hours = 0, minutes = 0, seconds = 0} = timeInfo;
  const {formattedAlt, time = {}, overPassed} = useTimer({
    initialDate: startedTransition.created_at,
    hours,
    minutes,
    seconds,
    duration: parseInt(duration, 10),
  });
  return (
    <View style={classes.root}>
      <View style={classes.timeWrapper}>
        <Text style={[classes.text, classes.time]}>{formattedAlt}</Text>
        <Text style={[classes.text, classes.seconds]}>
          {(time.seconds < 10 ? '0' : '') + time.seconds}
        </Text>
      </View>
      {!hideDuration && (
        <Text style={classes.durationText}>
          {_t('duration_label', {time: duration})}
        </Text>
      )}
      {overPassed && <Text style={classes.overPassedLabel}>over_passed</Text>}
      {isTriko && (
        <View style={classes.actions}>
          <BorderedButton
            onPress={onPressFinish}
            icon="check"
            label="finalize_service"
            success
          />
        </View>
      )}
    </View>
  );
};

export default ExecutionTimer;

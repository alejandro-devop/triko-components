import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import Text from 'shared/components/base/text';
import styles from './styles';
import {getElapsedTime, isEmpty} from 'shared/utils/functions';
import {STATUS_STARTED} from 'config/request-statuses';
import useTimer from 'shared/hooks/use-timer';
import useTranslation from 'shared/hooks/use-translate';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import moment from 'moment';
import _ from 'lodash';

const ExecutionTimer = ({
  onPressFinish,
  hideDuration,
  isTriko,
  request = {},
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {history, duration} = request;
  const startedTransition = history.find(({transition = {}, workflow = {}}) => {
    if (typeof transition === 'object') {
      return transition.workflow === STATUS_STARTED;
    } else {
      return workflow.name === STATUS_STARTED;
    }
  });

  const timeInfo = getElapsedTime(startedTransition.created_at, null, true);
  const {hours = 0, minutes = 0, seconds = 0} = timeInfo;
  const {formattedAlt, time = {}, overPassed} = useTimer({
    initialDate: !isEmpty(startedTransition)
      ? startedTransition.created_at
      : moment().format('YYYY-MM-DD HH:mm:ss'),
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
          {_.trim((time.seconds < 10 ? '0' : '') + time.seconds)}
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

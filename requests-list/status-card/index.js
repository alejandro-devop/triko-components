import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import classNames from 'shared/utils/classnames';
import Text from 'shared/components/base/text';
import icons from './icons';
import PreImage from 'shared/components/base/pre-image';
import {STATUS_ACCEPTED, STATUS_PAYMENT} from 'config/request-statuses';
import {isIn} from 'shared/utils/functions';
import {startedStatuses} from 'shared/hooks/use-request-status';

const StatusCard = ({isPaid, workflow}) => {
  const [classes] = useStyles(styles);
  const isAccepted =
    isIn(workflow, [STATUS_ACCEPTED, STATUS_PAYMENT]) && !isPaid;
  const isStarted = startedStatuses.includes(workflow);
  const isReadyToStart = isIn(workflow, [STATUS_PAYMENT]) && isPaid;
  let label = '';
  let icon = null;
  if (isAccepted) {
    label = 'waiting_text';
    icon = icons.time;
  } else if (isStarted) {
    label = 'started_text';
    icon = icons.check;
  } else if (isReadyToStart) {
    label = 'approved_text';
    icon = icons.check;
  }
  return (
    <View
      style={classNames(
        {root: true, rootAccepted: isAccepted, rootPaid: isPaid},
        classes,
      )}>
      {icon && <PreImage source={icon} style={classes.icon} />}
      <Text style={classNames({text: true, textPaid: isPaid}, classes)}>
        {label}
      </Text>
    </View>
  );
};

export default StatusCard;

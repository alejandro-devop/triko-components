import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import {acceptedStatuses} from 'shared/hooks/use-request-status';
import classNames from 'shared/utils/classnames';
import {isIn} from 'shared/utils/functions';
import Text from 'shared/components/base/text';
import icons from './icons';
import PreImage from 'shared/components/base/pre-image';

const StatusCard = ({isPaid, workflow}) => {
  const [classes] = useStyles(styles);
  const isAccepted = isIn(workflow, acceptedStatuses);
  let label = '';
  let icon = null;
  if (isAccepted) {
    label = 'approved_text';
    icon = icons.check;
  }
  return (
    <View style={classNames({root: true, rootPaid: isPaid}, classes)}>
      {icon && <PreImage source={icon} style={classes.icon} />}
      <Text style={classNames({text: true, textPaid: isPaid}, classes)}>
        {label}
      </Text>
    </View>
  );
};

export default StatusCard;

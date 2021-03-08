import React from 'react';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import {
  STATUS_ACCEPTED,
  STATUS_CONFIRM_FINISHED,
  STATUS_QUALIFY,
  STATUS_CONFIRM_START,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_PENDING,
  STATUS_STARTED,
  STATUS_FINISHED,
  STATUS_PAYMENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_CANCEL,
} from 'config/request-statuses';
import useTranslation from 'shared/hooks/use-translate';

const getStatus = workflow => {
  switch (workflow) {
    case STATUS_ACCEPTED:
      return {label: 'services_status_label_accepted', accepted: true};
    case STATUS_PENDING:
      return {label: 'services_status_label_pending', pending: true};
    case STATUS_PAYMENT:
      return {label: 'services_status_label_payment', payment: true};
    case STATUS_ON_MY_WAY:
      return {label: 'services_status_label_on_my_way', onMyWay: true};
    case STATUS_ON_YOUR_DOOR:
      return {label: 'services_status_label_on_your_door', onYourDoor: true};
    case STATUS_CONFIRM_START:
      return {label: 'services_status_label_confirm_start', confirmStart: true};
    case STATUS_STARTED:
      return {label: 'services_status_label_started', started: true};
    case STATUS_CONFIRM_FINISHED:
      return {
        label: 'services_status_label_confirm_finished',
        confirmFinished: true,
      };
    case STATUS_QUALIFY:
      return {label: 'services_status_label_qualify', qualify: true};
    case STATUS_QUALIFY_TRIKO:
      return {label: 'services_status_label_qualify', qualify: true};
    case STATUS_CANCEL:
      return {label: 'services_status_label_cancel', canceled: true};
    case STATUS_FINISHED:
      return {label: 'services_status_label_finished', finished: true};
    default:
      return {label: 'Unknown'};
  }
};

const StatusLabel = ({workflow, orderWorkflow}) => {
  const {
    label,
    pending,
    accepted,
    onYourDoor,
    onMyWay,
    confirmStart,
    started,
    confirmFinished,
    qualify,
    canceled,
  } = getStatus(workflow);
  const [classes] = useStyles(styles);
  let paid = false;
  const {_t} = useTranslation();
  let textLabel = label;
  if (workflow === STATUS_PAYMENT && orderWorkflow === 'Completed') {
    textLabel = 'services_paid_label';
    paid = true;
  }
  return (
    <View
      style={classNames(
        {
          root: true,
          pending,
          accepted: accepted || paid,
          onMyWay,
          onYourDoor,
          confirmStart,
          started,
          confirmFinished,
          qualify,
          canceled,
        },
        classes,
      )}>
      <Text
        style={classNames(
          {
            label: true,
            pendingText: pending,
          },
          classes,
        )}>
        {_t(textLabel)}
      </Text>
    </View>
  );
};

const styles = ({palette}) => ({
  root: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: palette.grayLight,
    borderRadius: 30,
    marginTop: 5,
    position: 'absolute',
    zIndex: 100,
    right: 10,
    top: 2,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  pending: {
    backgroundColor: palette.blue,
  },
  accepted: {
    backgroundColor: palette.success,
  },
  onMyWay: {
    backgroundColor: palette.blue,
  },
  onYourDoor: {
    backgroundColor: palette.success,
  },
  confirmStart: {
    backgroundColor: palette.blue,
  },
  started: {
    backgroundColor: palette.success,
  },
  confirmFinished: {
    backgroundColor: palette.success,
  },
  qualify: {
    backgroundColor: palette.success,
  },
  canceled: {
    backgroundColor: palette.red,
  },
  pendingText: {},
});

export default StatusLabel;

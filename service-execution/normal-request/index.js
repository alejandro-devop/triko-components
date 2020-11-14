import React from 'react';
import {View} from 'react-native';
import Stepper from '../stepper';
import {useStyles} from 'hooks/index';
import styles from './styles';
import Button from 'shared/components/base/buttons/button';
import useExecutionStep from 'shared/hooks/use-execution-step';
import {
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_START,
  STATUS_QUALIFY_CLIENT,
  STATUS_STARTED,
} from 'config/request-statuses';
import moment from 'moment';
import useTranslation from 'hooks/useTranslation';
import Timer from '../timer';

const NormalRequest = ({isTriko, onUpdateRequest, request = {}, workflow}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const activeStep = useExecutionStep(request);
  const isPendingConfirmStart = workflow === STATUS_CONFIRM_START;
  const {history = []} = request;
  const isStarted = workflow === STATUS_STARTED;
  const startedTransition = history.find(
    ({transition = {}}) => transition.workflow === STATUS_STARTED,
  );
  const startedDate = moment(
    startedTransition ? startedTransition.created_at : null,
  ).format('h:mm a');

  const getFinalizeDescription = () => {
    if (workflow === STATUS_CONFIRM_FINISHED) {
      return 'waiting_for_client_to_confirm';
    } else if (workflow === STATUS_QUALIFY_CLIENT) {
      return 'waiting_for_client_to_qualify';
    }
  };

  const steps = [
    {
      label: 'on_my_way',
      title: 'My  address',
      description: 'Address description',
      action: {
        label: 'arrive_to_location',
        callback: () => {
          onUpdateRequest();
        },
      },
    },
    {
      label: 'arrive_to_location',
      description: isPendingConfirmStart
        ? 'in_the_location_description_awaiting'
        : 'in_the_location_description',
      action: {
        label: 'start_service',
        callback: () => onUpdateRequest(),
      },
      noAction: isPendingConfirmStart,
    },
    {
      label: 'service_start_service',
      title: _t('service_started_date', {time: startedDate}),
    },
    {
      label: 'finish_service_label',
      description: getFinalizeDescription(),
    },
  ];

  const handleFinish = async () => {
    await onUpdateRequest();
  };

  return (
    <View style={classes.root}>
      <View style={classes.content}>
        <Stepper
          collapsed={isStarted}
          activeStep={activeStep}
          isTriko={isTriko}
          request={request}
          steps={steps}
        />
        {isStarted && <Timer request={request} onPressFinish={handleFinish} />}
      </View>
      <View style={classes.actions}>
        <Button primary size="xxs">
          view_in_map
        </Button>
      </View>
    </View>
  );
};

export default NormalRequest;

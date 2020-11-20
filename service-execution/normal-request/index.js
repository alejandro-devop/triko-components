import React, {useState} from 'react';
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
  STATUS_QUALIFY_TRIKO,
  STATUS_STARTED,
} from 'config/request-statuses';
import moment from 'moment';
import useTranslation from 'hooks/useTranslation';
import Timer from '../timer';
import ConfirmBubble from 'shared/components/base/confirm-bubble';
import ViewOnMap from '../view-on-map';

const NormalRequest = ({isTriko, onUpdateRequest, request = {}, workflow}) => {
  const [visibleMap, setVisibleMap] = useState(false);
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const activeStep = useExecutionStep(request);
  const isPendingConfirmStart = workflow === STATUS_CONFIRM_START;
  const {history = [], attrs = {}, triko: trikos = []} = request;
  const [triko = {}] = trikos;
  const {longitude, latitude} = attrs;
  const isStarted = workflow === STATUS_STARTED;
  const isFinished = workflow === STATUS_CONFIRM_FINISHED;
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
      title: request.address,
      description: request.addressDescription,
      action: {
        label: 'arrive_to_location',
        callback: () => {
          onUpdateRequest();
        },
      },
      noAction: !isTriko,
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
      noAction: isPendingConfirmStart || !isTriko,
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

  const handleAccept = async () => {
    await onUpdateRequest();
  };

  const toggleViewMap = () => setVisibleMap(!visibleMap);

  return (
    <>
      <View style={classes.root}>
        <View style={classes.content}>
          <Stepper
            collapsed={isStarted || isFinished}
            activeStep={activeStep}
            isTriko={isTriko}
            request={request}
            steps={steps}
          />
          {isStarted && (
            <Timer
              request={request}
              isTriko={isTriko}
              onPressFinish={handleFinish}
            />
          )}
          {!isTriko && workflow === STATUS_CONFIRM_START && (
            <ConfirmBubble
              message="triko_is_waiting_for_start_confirm"
              onAccept={handleAccept}
            />
          )}
          {!isTriko && workflow === STATUS_CONFIRM_FINISHED && (
            <ConfirmBubble
              message="triko_is_waiting_for_end_confirm"
              onAccept={handleAccept}
            />
          )}
        </View>
        {isTriko &&
          !isFinished &&
          workflow !== STATUS_QUALIFY_CLIENT &&
          workflow !== STATUS_QUALIFY_TRIKO && (
            <View style={classes.actions}>
              <Button primary size="xxs" onPress={toggleViewMap}>
                view_in_map
              </Button>
            </View>
          )}
      </View>
      {visibleMap && (
        <ViewOnMap
          isTriko={isTriko}
          open={visibleMap}
          destination={{latitude, longitude}}
          onClose={toggleViewMap}
          request={request}
          title={request.address}
        />
      )}
    </>
  );
};

export default NormalRequest;

import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import Stepper from 'shared/components/service-execution/stepper';
import ViewOnMap from '../view-on-map';
import {isEmpty} from 'shared/utils/functions';
import Button from 'shared/components/base/buttons/button';
import Text from 'shared/components/base/text';
import InfoRow from './info-row';
import useRequestUpdate from 'shared/hooks/use-request-update';
import {LoadingCurtain} from 'components/base/dialogs';
import InfoMessage from 'shared/components/messages/InfoMessage';
import {useStepDescriptor} from './hooks';
import {
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_START,
  STATUS_FINISHED,
  STATUS_ON_GOING,
  STATUS_QUALIFY_CLIENT,
  STATUS_STARTED,
} from 'config/request-statuses';
import useTranslation from 'hooks/useTranslation';
import useRequestUpdateAttrs from 'shared/hooks/use-request-update-attrs';
import useExecutionStep from 'shared/hooks/use-execution-step';
import moment from 'moment';
import Timer from 'shared/components/service-execution/timer';

const TaskRequest = ({
  isTriko,
  request = {},
  refreshRequest,
  onUpdateRequest,
}) => {
  const [classes] = useStyles(styles);
  const [mapLocation, setMapLocation] = useState({
    latitude: null,
    longitude: null,
    title: null,
    description: null,
  });
  const {history = [], attributes, transition = {}} = request;
  const {_t} = useTranslation();
  const requestAttrs = !isEmpty(attributes) ? JSON.parse(attributes) : {};
  const {tools = [], instructions} = requestAttrs;
  const activeStep = useExecutionStep(request, {isTask: true});
  const {workflow} = transition;
  // const [activeStep, workflow] = useExecutionStep(currentWorkflow); // going to shop = 4;p
  const stepDescription = useStepDescriptor(isTriko, workflow, request);
  const isPendingConfirmStart = workflow === STATUS_CONFIRM_START;
  const isStarted = [STATUS_STARTED].includes(workflow);
  const isFinished = [STATUS_FINISHED].includes(workflow);
  const startedTransition = history.find(
    ({transition = {}}) => transition.workflow === STATUS_STARTED,
  );
  const startedDate = moment(
    startedTransition ? startedTransition.created_at : null,
  ).format('h:mm a');

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
      // Here the triko goes to the shopping place, indicates he's acquiring the products
      label: 'finish_service_label',
      title: stepDescription.title,
      description: stepDescription.description,
      action: {
        label: stepDescription.label,
        callback: () => {
          onUpdateRequest();
        },
      },
      noAction: !isTriko,
    },
  ];

  const viewOnMap = () => {};

  const closeMap = () => {
    setMapLocation({
      ...mapLocation,
      latitude: null,
      longitude: null,
    });
  };

  const handleFinish = async () => {
    await onUpdateRequest();
  };

  console.log('workflow: ', workflow);
  const {latitude, longitude} = mapLocation;
  const collapsed =
    [STATUS_QUALIFY_CLIENT, STATUS_CONFIRM_FINISHED].includes(workflow) ||
    workflow === STATUS_STARTED ||
    isFinished;

  return (
    <>
      <View style={classes.root}>
        <View style={classes.content}>
          <Stepper
            collapsed={collapsed}
            activeStep={activeStep}
            isTriko={isTriko}
            request={request}
            steps={steps}
          />
          {isTriko && workflow === STATUS_QUALIFY_CLIENT && (
            <View style={classes.messageWrapper}>
              <InfoMessage text="waiting_for_client_qualification" />
            </View>
          )}
          {isStarted && (
            <>
              <Timer
                request={request}
                isTriko={isTriko}
                hideDuration
                onPressFinish={handleFinish}
              />
              <View style={classes.instructionsContent}>
                <Text style={classes.instructionsTitle}>instructions_text</Text>
                <View style={classes.instructionsContentInner}>
                  <Text style={[classes.instructionsText]}>{instructions}</Text>
                </View>
              </View>
            </>
          )}
          {tools.length > 0 && !isFinished && (
            <View style={classes.toolsWrapper}>
              <Text style={classes.toolsTitle}>required_tools_title</Text>
              {tools.map((tool, key) => (
                <InfoRow label={tool} key={`tool-key${key}`} icon="tools" />
              ))}
            </View>
          )}
          {!collapsed && (
            <View style={classes.actionsWrapper}>
              <Button primary size="xxs" onPress={viewOnMap}>
                view_on_map
              </Button>
            </View>
          )}
        </View>
      </View>
      {!isEmpty(latitude) && !isEmpty(longitude) && (
        <ViewOnMap
          onClose={closeMap}
          destination={mapLocation}
          request={request}
          isTriko={isTriko}
          open
        />
      )}
    </>
  );
};

export default TaskRequest;

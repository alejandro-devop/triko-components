import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import Stepper from 'shared/components/service-execution/stepper';
import ViewOnMap from '../view-on-map';
import {isEmpty} from 'shared/utils/functions';
import Button from 'shared/components/base/buttons/button';
import {LoadingCurtain} from 'components/base/dialogs';
import InfoMessage from 'shared/components/messages/InfoMessage';
import {useStepDescriptor} from './hooks';
import {STATUS_ON_GOING, STATUS_QUALIFY_CLIENT} from 'config/request-statuses';
import useTranslation from 'hooks/useTranslation';
import useRequestUpdateAttrs from 'shared/hooks/use-request-update-attrs';
import Text from 'shared/components/base/text';

const CourierRequest = ({
  isTriko,
  request = {},
  updateRequest,
  refreshRequest,
}) => {
  const [classes] = useStyles(styles);
  const [mapLocation, setMapLocation] = useState({
    latitude: null,
    longitude: null,
    title: null,
    description: null,
  });
  const {attributes, transition = {}} = request;
  const {_t} = useTranslation();
  const requestAttrs = !isEmpty(attributes) ? JSON.parse(attributes) : {};
  const {
    stops,
    instructions,
    currentStep = 0,
    lastStepConfirm,
    lastStep: isLastStep,
  } = requestAttrs;
  const {workflow} = transition;
  const activeStep = currentStep;
  const stepDescription = useStepDescriptor(isTriko, workflow, request);
  const {loading: saving, sendRequest} = useRequestUpdateAttrs(request);

  const updateStep = async () => {
    const nextStep = currentStep + 1;
    const lastStep = nextStep >= stops.length;
    await sendRequest({
      attrs: {
        currentStep: nextStep,
        lastStep,
      },
    });

    if (lastStep && lastStepConfirm) {
      await updateRequest(request);
    }
    await refreshRequest();
  };

  const getStepsFromStops = () => {
    const stepsFromStops = stops.map((item, key) => {
      const {address = {}, title} = item;
      return {
        label: _t('stop_number', {number: key + 1}),
        title,
        description: address.address,
        action: {
          label: 'arrived_to_stop',
          callback: () => {
            updateStep();
          },
        },
        noAction: !isTriko,
      };
    });

    return stepsFromStops;
  };
  const steps = [
    ...getStepsFromStops(),
    {
      // Here the triko goes to the shopping place, indicates he's acquiring the products
      label: 'finish_service_label',
      title: '',
      description:
        isLastStep && !lastStepConfirm
          ? 'waiting_for_client_confirmation'
          : stepDescription.description,
      action: {
        label: stepDescription.label,
        callback: () => {
          updateRequest(request);
        },
      },
      noAction: !isTriko,
    },
  ];

  const viewOnMap = () => {
    const currentStop = stops[currentStep];
    if (currentStop) {
      const {address: addressObj = {}} = currentStop;
      const {address, lat, lng} = addressObj;
      setMapLocation({latitude: lat, longitude: lng, title: address});
    }
  };

  const closeMap = () => {
    setMapLocation({
      ...mapLocation,
      latitude: null,
      longitude: null,
    });
  };

  const {latitude, longitude} = mapLocation;
  const collapsed =
    [STATUS_QUALIFY_CLIENT].includes(workflow) ||
    (isLastStep && !lastStepConfirm);

  return (
    <>
      {saving && <LoadingCurtain />}
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
            <InfoMessage text="waiting_for_client_qualification" />
          )}
          {[STATUS_ON_GOING].includes(workflow) && (
            <View style={classes.instructionsContent}>
              <Text style={classes.instructionsTitle}>instructions_text</Text>
              <View style={classes.instructionsContentInner}>
                <Text style={[classes.instructionsText]}>{instructions}</Text>
              </View>
            </View>
          )}
          {!collapsed && isTriko && (
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

export default CourierRequest;

import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import Stepper from 'shared/components/service-execution/stepper';
import Icon from 'shared/components/base/icon';
import ViewOnMap from '../view-on-map';
import useExecutionStep from 'shared/hooks/use-execution-step';
import UploadBill from './upload-bill';
import {isEmpty} from 'shared/utils/functions';
import Button from 'shared/components/base/buttons/button';
import useRequestUpdate from 'shared/hooks/use-request-update';
import {LoadingCurtain} from 'components/base/dialogs';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import Text from 'shared/components/base/text';
import UploadTransferReceipt from './upload-transfer-receipt';
import ShoppingCart from './shopping-cart';
import InfoMessage from 'shared/components/messages/InfoMessage';
import ConfirmPayment from './confirm-payment';
// import {useExecutionStep} from './workflowMock';
import {useStepDescriptor} from './hooks';
import {
  STATUS_CONFIRM_PAYMENT,
  STATUS_GOING_TO_SHOP,
  STATUS_ON_MY_WAY_DESTINATION,
  STATUS_ON_YOUR_DOOR,
  STATUS_PAYING_CART,
  STATUS_PAYING_ORDER,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_WAITING_FOR_CLIENT,
} from 'config/request-statuses';
import useTranslation from 'hooks/useTranslation';
import useRequestUpdateAttrs from 'shared/hooks/use-request-update-attrs';

const CourierRequest = ({isTriko, request = {}, refreshRequest}) => {
  const [classes] = useStyles(styles);
  const [openCart, setOpenCart] = useState(false);
  const [mapLocation, setMapLocation] = useState({
    latitude: null,
    longitude: null,
    title: null,
    description: null,
  });
  const {attributes, transition = {}} = request;
  const {_t} = useTranslation();
  const requestAttrs = !isEmpty(attributes) ? JSON.parse(attributes) : {};
  const {requestType, stops, currentStep = 0} = requestAttrs;
  const executionType = {
    isShopper: requestType === 'shopper',
    isCourier: requestType === 'courier',
    isTask: requestType === 'task',
  };
  const {workflow} = transition;
  // const [activeStep, workflow] = useExecutionStep(currentWorkflow); // going to shop = 4;
  const executionStep = useExecutionStep(request, executionType); // going to shop = 4;
  const activeStep = currentStep;
  const stepDescription = useStepDescriptor(isTriko, workflow, request);
  const {loading, updateRequest} = useRequestUpdate();
  const {loading: saving, sendRequest} = useRequestUpdateAttrs(request);

  const updateStep = async () => {
    const nextStep = currentStep + 1;
    await sendRequest({
      attrs: {
        currentStep: nextStep,
      },
    });
    if (nextStep >= stops.length) {
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
      };
    });

    return stepsFromStops;
  };
  const steps = [
    ...getStepsFromStops(),
    {
      // Here the triko goes to the shopping place, indicates he's acquiring the products
      label: 'finish_service_label',
      title: '__',
      description: stepDescription.description,
      action: {
        label: stepDescription.label,
        callback: () => {
          updateRequest(request);
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

  const {latitude, longitude} = mapLocation;
  const collapsed = [STATUS_QUALIFY_CLIENT].includes(workflow);
  return (
    <>
      {(loading || saving) && <LoadingCurtain />}
      <View style={classes.root}>
        <View style={classes.content}>
          <Stepper
            collapsed={collapsed}
            activeStep={activeStep}
            isTriko={isTriko}
            request={request}
            steps={steps}
          />
          {isTriko && <InfoMessage text="waiting_for_client_qualification" />}
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

export default CourierRequest;

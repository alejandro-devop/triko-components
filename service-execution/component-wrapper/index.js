import React, {useState} from 'react';
import {View} from 'react-native';
import {useSession, useStyles} from 'hooks/index';
import styles from './styles';
import Actions from '../request-actions';
import RateClientWrapper from '../rate-client';
import RateTrikoService from '../rate-triko';
import {
  REQUEST_TYPE_COURIER,
  REQUEST_TYPE_SHOPPER,
  REQUEST_TYPE_TASK,
} from 'config/constants';
import ShopperRequest from '../shopper-request';
import CourierRequest from '../courier-request';
import TaskRequest from '../task-request';
import NormalRequest from '../normal-request';
import useRequestUpdate from 'shared/hooks/use-request-update';
import {LoadingCurtain} from 'components/base/dialogs';
import {
  STATUS_FINISHED,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
} from 'config/request-statuses';
import ServiceResume from '../service-resume';
import useNavigate from 'shared/hooks/use-navigate';
import ConfirmSlide from 'components/base/confirm-slide';
import Button from 'shared/components/base/buttons/button';

const ComponentWrapper = ({isTriko, request = {}, refreshRequest}) => {
  const {details = [], transition = {}} = request;
  const [openCancel, setOpenCancel] = useState(false);
  const {workflow} = transition;
  const {navigation} = useNavigate();
  const {updateRequest, cancelRequest, loading} = useRequestUpdate();
  const {setKey} = useSession();
  const [detail = {}] = details;
  const {service = {}} = detail;
  const serviceAttrs = service.attrs ? JSON.parse(service.attrs) : {};
  let isShopper = false;
  let isCourier = false;
  let isTask = false;
  let Component = NormalRequest;
  // const isFavor = trikoFavorIds.includes(service.type.id);
  if (serviceAttrs && serviceAttrs.type === REQUEST_TYPE_SHOPPER) {
    isShopper = true;
    Component = ShopperRequest;
  } else if (serviceAttrs && serviceAttrs.type === REQUEST_TYPE_COURIER) {
    isCourier = true;
    Component = CourierRequest;
  } else if (serviceAttrs && serviceAttrs.type === REQUEST_TYPE_TASK) {
    isTask = true;
    Component = TaskRequest;
  }
  const [classes] = useStyles(styles);

  const toggleCancel = () => setOpenCancel(!openCancel);

  const handleRequestUpdate = async () => {
    await updateRequest(request);
  };
  const handleTerminate = async () => {
    if (isTriko) {
      setTimeout(() => {
        navigation.navigate('activity');
        handleRequestUpdate();
      }, 800);
    } else {
      navigation.navigate('activity');
    }
  };

  const handleOpenChat = () => {
    setKey('selectedChat', {request});
    navigation.navigate('chat-room');
  };

  const handleRateSend = async () => {
    await handleRequestUpdate();
    if (isCourier || isTask || isShopper) {
      navigation.navigate('activity');
    }
  };

  const handleCancel = () => {
    toggleCancel();
  };

  const handleExit = () => {
    navigation.goBack();
  };

  // const handleReport = () => {};

  const isQualifying =
    [STATUS_QUALIFY_TRIKO].includes(workflow) ||
    (!isTriko && workflow === STATUS_QUALIFY_CLIENT);
  const isFinished =
    [STATUS_FINISHED].includes(workflow) ||
    (!isTriko && workflow === STATUS_QUALIFY_TRIKO);
  const handleCancelRequest = async () => {
    await cancelRequest(request);
    navigation.navigate('activity');
  };
  const isFavor = isShopper || isCourier || isTask;

  return (
    <>
      <View style={classes.root}>
        <View style={classes.content}>
          {!isFinished && !isQualifying && (
            <Component
              isTriko={isTriko}
              isShopper={isShopper}
              isCourier={isCourier}
              isTask={isTask}
              onUpdateRequest={handleRequestUpdate}
              request={request}
              workflow={workflow}
              refreshRequest={refreshRequest}
            />
          )}
          {workflow === STATUS_QUALIFY_TRIKO && isTriko && (
            <RateClientWrapper request={request} onRateSend={handleRateSend} />
          )}
          {workflow === STATUS_QUALIFY_CLIENT && !isTriko && (
            <RateTrikoService
              request={request}
              onRateSend={handleRequestUpdate}
            />
          )}
          {isFinished && (
            <ServiceResume
              isShopper={isShopper}
              isCourier={isCourier}
              isTask={isTask}
              request={request}
              isTriko={isTriko}
              onTerminate={handleTerminate}
            />
          )}
          <View style={classes.tip} />
          {openCancel && (
            <ConfirmSlide
              message="confirm_cancel_request"
              onAccept={handleCancelRequest}
              onCancel={toggleCancel}
            />
          )}
        </View>
        {!openCancel && !isQualifying && (
          <Actions
            onCancel={handleCancel}
            onOpenChat={handleOpenChat}
            workflow={workflow}
          />
        )}
      </View>
      {loading && <LoadingCurtain />}
    </>
  );
};

export default ComponentWrapper;

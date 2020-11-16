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

const ComponentWrapper = ({isTriko, request = {}}) => {
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
    // Component = CourierCard;
  } else if (serviceAttrs && serviceAttrs.type === REQUEST_TYPE_TASK) {
    isTask = true;
    // Component = TaskCard;
  }
  const [classes] = useStyles(styles);

  const toggleCancel = () => setOpenCancel(!openCancel);

  const handleRequestUpdate = async () => {
    await updateRequest(request);
  };
  const handleTerminate = async () => {
    if (isTriko) {
      await handleRequestUpdate();
    }
    navigation.navigate('activity');
  };

  const handleOpenChat = () => {
    setKey('selectedChat', {request});
    navigation.navigate('chat-room');
  };

  const handleCancel = () => {
    toggleCancel();
  };

  // const handleReport = () => {};

  const isQualifying = [STATUS_QUALIFY_CLIENT, STATUS_QUALIFY_TRIKO].includes(
    workflow,
  );
  const isFinished =
    [STATUS_FINISHED].includes(workflow) ||
    (!isTriko && workflow === STATUS_QUALIFY_TRIKO);
  const shouldRenderComponent = !isQualifying && !isQualifying;
  const handleCancelRequest = async () => {
    await cancelRequest(request);
    navigation.navigate('activity');
  };
  
  return (
    <>
      <View style={classes.root}>
        <View style={classes.content}>
          {shouldRenderComponent && !isFinished && (
            <Component
              isTriko={isTriko}
              isShopper={isShopper}
              isCourier={isCourier}
              isTask={isTask}
              onUpdateRequest={handleRequestUpdate}
              request={request}
              workflow={workflow}
            />
          )}
          {isQualifying && isTriko && (
            <RateClientWrapper
              request={request}
              onRateSend={handleRequestUpdate}
            />
          )}
          {workflow === STATUS_QUALIFY_CLIENT && !isTriko && (
            <RateTrikoService
              request={request}
              onRateSend={handleRequestUpdate}
            />
          )}
          {isFinished && (
            <ServiceResume
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
          <Actions onCancel={handleCancel} onOpenChat={handleOpenChat} />
        )}
      </View>
      {loading && <LoadingCurtain />}
    </>
  );
};

export default ComponentWrapper;

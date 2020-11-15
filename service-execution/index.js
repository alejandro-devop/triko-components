import React, {useState, useEffect} from 'react';
// import Header from './Header';
import Header from './request-header';
import {AppState} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import Wrapper from './Wrapper';
// import OnMyWay from './on-my-way';
// import Actions from './Actions';
// import InTheLocation from './InTheLocation';
// import useStyles from 'hooks/useStyles';
// import OnExecution from './OnExecution';
// import Finished from './Finished';
// import RateService from './RateService';
import useUserLocation from 'hooks/useUserLocation';
import CircularLoader from 'components/base/loaders/CircularLoader';
import ComponentWrapper from './component-wrapper';
import useSession from 'hooks/useSession';
import {useQuery} from '@apollo/react-hooks';
import {GET_REQUEST} from './queries';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
// import ChatDialog from 'components/service-execution/ChatDialog';
// import {
//   STATUS_ACCEPTED,
//   STATUS_CONFIRM_FINISHED,
//   STATUS_CONFIRM_START,
//   STATUS_ON_MY_WAY,
//   STATUS_ON_YOUR_DOOR,
//   STATUS_QUALIFY,
//   STATUS_STARTED,
//   STATUS_QUALIFY_CLIENT,
//   STATUS_QUALIFY_TRIKO,
// } from 'config/request-statuses';
import usePusherSubscriber from 'hooks/usePusherSubscriber';
import {EVENT__MESSAGE, EVENT__SERVICE_REQUEST} from 'helpers/PusherClient';
// import useTranslation from 'hooks/useTranslation';
// import LinkButton from 'components/base/buttons/link-button';
// import RequestDetail from 'components/request-detail';
// import PermissionsManager, {
//   PERMISSIONS,
// } from 'components/base/permissions-manager';
import {isEmpty} from 'shared/utils/functions';

const ServiceExecution = ({isTriko}) => {
  const {
    stack: {selectedToExecution, locale},
  } = useSession();
  const [appState, setAppState] = useState('active');
  const {subscribeEvent, unSubscribeEvent} = usePusherSubscriber();
  const {location, loading} = useUserLocation();
  const {loading: loadingRequest, refetch, data = {}} = useQuery(GET_REQUEST, {
    pollInterval: 8000,
    variables: {
      id: selectedToExecution.id,
      locale,
    },
  });
  const [request = {}] =
    data.response && Array.isArray(data.response) ? data.response : [];

  const onRefresh = async () => {
    await refetch();
  };

  const onAppFocusChange = (nextAppState) => {
    setAppState(nextAppState);
    if (nextAppState === 'active') {
      onRefresh();
    }
  };

  useEffect(() => {
    const idSubscription = subscribeEvent(EVENT__SERVICE_REQUEST, onRefresh);
    const messageSubscription = subscribeEvent(EVENT__MESSAGE, () => {
      onRefresh();
    });
    AppState.addEventListener('change', onAppFocusChange);
    return () => {
      unSubscribeEvent(EVENT__SERVICE_REQUEST, idSubscription);
      unSubscribeEvent(EVENT__MESSAGE, messageSubscription);
      AppState.removeEventListener('change', onAppFocusChange);
    };
  });

  if (appState !== 'active') {
    return null;
  }

  return (
    <>
      {loadingRequest && <LoadingCurtain />}
      {!isEmpty(request) && <Header isTriko={isTriko} request={request} />}
      <Wrapper>
        <ScrollView>
          <ComponentWrapper isTriko={isTriko} request={request} />
        </ScrollView>
        {!location && (loading || loadingRequest) && <CircularLoader />}
        {/*{location && !loading && !loadingRequest && (*/}
        {/*  <View style={classes.content}>*/}
        {/*    {currentStep === 0 && (*/}
        {/*      <OnMyWay userLocation={location} request={request} />*/}
        {/*    )}*/}
        {/*    {currentStep === 1 && (*/}
        {/*      <InTheLocation request={request} onNext={onNext} />*/}
        {/*    )}*/}
        {/*    {currentStep === 2 && (*/}
        {/*      <OnExecution request={request} onNext={onNext} />*/}
        {/*    )}*/}
        {/*    {currentStep === 3 && !finished && (*/}
        {/*      <Finished onNext={() => setFinished(true)} request={request} />*/}
        {/*    )}*/}
        {/*    {finished && <RateService onDone={onDone} request={request} />}*/}
        {/*  </View>*/}
        {/*)}*/}

        {/*{!finished && currentStep < 3 && (*/}
        {/*  <Actions*/}
        {/*    request={selectedToExecution}*/}
        {/*    hasMessages={messagesCount > 0}*/}
        {/*    messages={messagesCount}*/}
        {/*    toggleChat={toggleChat}*/}
        {/*    currentStep={currentStep}*/}
        {/*  />*/}
        {/*)}*/}

        {/*{currentStep < 3 && (*/}
        {/*  <View style={classes.detailsWrapper}>*/}
        {/*    <LinkButton primary onPress={toggleDetail}>*/}
        {/*      {_t('service_execution_view_details')}*/}
        {/*    </LinkButton>*/}
        {/*  </View>*/}
        {/*)}*/}
      </Wrapper>
      {/*{visibleChat && (*/}
      {/*  <ChatDialog request={request} open onClose={toggleChat} />*/}
      {/*)}*/}
      {/*{openDetail && (*/}
      {/*  <RequestDetail hideControls onClose={toggleDetail} request={request} />*/}
      {/*)}*/}
    </>
  );
};

const styles = {
  detailsWrapper: {
    alignItems: 'center',
  },
  content: {
    zIndex: -1,
  },
};

export default ServiceExecution;

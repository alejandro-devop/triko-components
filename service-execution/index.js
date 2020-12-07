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
  const [refreshing, setRefreshing] = useState(false);
  const [appState, setAppState] = useState('active');
  const {subscribeEvent, unSubscribeEvent} = usePusherSubscriber();
  const {location, loading} = useUserLocation();
  const {loading: loadingRequest, refetch, data = {}} = useQuery(GET_REQUEST, {
    fetchPolicy: 'no-cache',
    pollInterval: 5000,
    variables: {
      id: selectedToExecution.id,
      locale,
    },
  });
  const [request = {}] =
    data.response && Array.isArray(data.response) ? data.response : [];

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    } catch (e) {
      //Todo: Check why it's throwing an exception when the workflow changes.
    }
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
      {!isEmpty(request) && <Header isTriko={isTriko} request={request} />}
      <Wrapper>
        <ScrollView>
          <ComponentWrapper
            isTriko={isTriko}
            request={request}
            refreshRequest={onRefresh}
          />
        </ScrollView>
        {!location && (loading || loadingRequest) && <CircularLoader />}
      </Wrapper>
      {(loadingRequest || refreshing) && <LoadingCurtain disableModal />}
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

import React, {useState, useEffect} from 'react';
import Header from './request-header';
import {AppState} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import Wrapper from './Wrapper';
import useUserLocation from 'hooks/useUserLocation';
import CircularLoader from 'components/base/loaders/CircularLoader';
import ComponentWrapper from './component-wrapper';
import useSession from 'hooks/useSession';
import {useQuery} from '@apollo/react-hooks';
import {GET_REQUEST} from './queries';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
import usePusherSubscriber from 'hooks/usePusherSubscriber';
import {EVENT__MESSAGE, EVENT__SERVICE_REQUEST} from 'helpers/PusherClient';
import {isEmpty} from 'shared/utils/functions';
import useErrorReporter from 'shared/hooks/use-error-reporter';

const ServiceExecution = ({isTriko}) => {
  const {
    stack: {selectedToExecution, locale},
  } = useSession();
  const [refreshing, setRefreshing] = useState(false);
  const [appState, setAppState] = useState('active');
  const {subscribeEvent, unSubscribeEvent} = usePusherSubscriber();
  const reportError = useErrorReporter({
    path: 'src/shared/components/service-execution/index.js',
  });
  const {location, loading} = useUserLocation();
  const {loading: loadingRequest, refetch, data = {}} = useQuery(GET_REQUEST, {
    fetchPolicy: 'no-cache',
    pollInterval: 5000,
    variables: {
      id: selectedToExecution.id,
      locale,
    },
  });
  const [updatedRequest = {}] =
    data.response && Array.isArray(data.response) ? data.response : [];
  const request =
    !isEmpty(updatedRequest) && !isEmpty(updatedRequest.id)
      ? updatedRequest
      : selectedToExecution;
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    } catch (e) {
      reportError(e, {code: 'TK-000005'});
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
  console.log('Request: ', request, selectedToExecution, data.response);
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

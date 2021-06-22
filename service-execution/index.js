import React, {useState, useEffect} from 'react';
import Header from './request-header';
import {AppState, Platform} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import Wrapper from './Wrapper';
import useUserLocation from 'shared/hooks/use-user-location';
import CircularLoader from 'components/base/loaders/CircularLoader';
import ComponentWrapper from './component-wrapper';
import useSession from 'hooks/useSession';
import {useQuery} from '@apollo/react-hooks';
import {GET_REQUEST} from './queries';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
import {isEmpty} from 'shared/utils/functions';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useRegionConfig from 'shared/hooks/use-regional-config';
import useFbListener from 'shared/hooks/use-fb-listener';

const ServiceExecution = ({isTriko}) => {
  const {
    stack: {selectedToExecution, locale},
  } = useSession();
  const [refreshing, setRefreshing] = useState(false);
  const [appState, setAppState] = useState('active');
  const [tempImage, setTempImage] = useState();
  const reportError = useErrorReporter({
    path: 'src/shared/components/service-execution/index.js',
  });
  const {requestFetchInterval} = useRegionConfig();
  const {location, loading} = useUserLocation();
  const {loading: loadingRequest, refetch, data = {}} = useQuery(GET_REQUEST, {
    fetchPolicy: 'no-cache',
    pollInterval: requestFetchInterval,
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
    if (nextAppState === 'active' && Platform.OS !== 'android') {
      onRefresh();
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', onAppFocusChange);
    return () => {
      AppState.removeEventListener('change', onAppFocusChange);
    };
  });

  useFbListener(() => {
    onRefresh();
  }, ['execution-update', 'view-execution']);

  useFbListener(() => {
    onRefresh();
  }, 'message-received');

  if (appState !== 'active' && Platform.OS !== 'android') {
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
            setTempImage={setTempImage}
            tempImage={tempImage}
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

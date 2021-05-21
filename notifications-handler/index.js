import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import useNavigate from 'shared/hooks/use-navigate';
import useSession from 'hooks/useSession';
import useMessageStack from 'hooks/useMessageStack';

const NotificationsHandler = ({onEventReceived}) => {
  const {navigation} = useNavigate();
  const {refreshNotifies} = useMessageStack();
  const {setKey} = useSession();
  const goToRequest = (requestId) => {
    setKey('requestDetailSelected', {request: {id: requestId}});
    setTimeout(() => {
      navigation.navigate('request-detail', {params: {requestId: requestId}});
    }, 100);
  };
  const goToExecution = (requestId) => {
    setKey('selectedToExecution', {id: requestId});
    setTimeout(() => {
      navigation.navigate('execution', {params: {requestId: requestId}});
    }, 100);
  };
  const goTo = (path, params = {}) => {
    navigation.navigate(path, {params});
  };
  useEffect(() => {
    messaging().onMessage(({data}) => {
      refreshNotifies();
      const {type} = data;
      if (type === 'view-request') {
        goToRequest(data.id);
      }
      if (type === 'view-my-requests') {
        goTo('requests');
      }
      if (type === 'view-execution') {
        goToExecution(data.id);
      }
      if (onEventReceived) {
        onEventReceived(data);
      }
    });

    messaging().onNotificationOpenedApp(({data = {}}) => {
      const {type} = data;
      if (type === 'request') {
        goTo('requests');
      }
      if (type === 'service-request' || type === 'view-request') {
        goToRequest(data.id);
      }
      if (type === 'view-execution') {
        goToExecution(data.id);
      }
      if (onEventReceived) {
        onEventReceived(data);
      }
      refreshNotifies();
    });
  }, []);
  return null;
};

export default NotificationsHandler;

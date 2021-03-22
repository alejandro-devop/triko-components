import {useContext, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import useNavigate from 'shared/hooks/use-navigate';
import useSession from 'hooks/useSession';
import useMessageStack from 'hooks/useMessageStack';

const NotificationsHandler = ({onEventReceived}) => {
  const {navigation} = useNavigate();
  const {refreshNotifies} = useMessageStack();
  const {} = useSession();
  useEffect(() => {
    messaging().onMessage((data) => {
      refreshNotifies();
      if (onEventReceived) {
        onEventReceived(data);
      }
    });
    messaging().onNotificationOpenedApp(({data = {}}) => {
      const {type} = data;
      if (type === 'request') {
        navigation.navigate('pending-services', {params: {requestId: data.id}});
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

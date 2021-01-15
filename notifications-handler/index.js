import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import useNavigate from 'shared/hooks/use-navigate';
import useSession from 'hooks/useSession';
import useMessageStack from 'hooks/useMessageStack';

const NotificationsHandler = () => {
  const {navigation} = useNavigate();
  const {refreshNotifies} = useMessageStack();
  const {} = useSession();
  useEffect(() => {
    messaging().onMessage((data) => {
      refreshNotifies();
    });
    messaging().onNotificationOpenedApp(({data = {}}) => {
      const {type} = data;
      if (type === 'request') {
        navigation.navigate('pending-services', {params: {requestId: data.id}});
      }
      refreshNotifies();
      console.log('notify:', data);
      console.log('Notification from background!');
    });
  }, []);
  return null;
};

export default NotificationsHandler;

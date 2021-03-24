import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import useSession from 'hooks/useSession';
import useUserUpdate from 'shared/hooks/use-user-update';
export const NotificationsContext = React.createContext(null);
const ContextProvider = NotificationsContext.Provider;

/**
 * This component initializes the application notifications using firebase.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param children
 * @returns {*}
 * @constructor
 */
const NotificationsContextProvider = ({children}) => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const {updateUser} = useUserUpdate();
  const {setAll} = useSession();
  const [fbToken, setFbToken] = useState(null);
  const initializeFirebase = async () => {
    try {
      const settings = await messaging().requestPermission();
      if (settings) {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        await updateUser({
          attrs: {
            fbToken: token,
          },
        });
        setAll({
          fbToken: token,
          hasNotifyPermissions: true,
        });
        setHasPermissions(true);
        setFbToken({
          token,
        });
      }
    } catch (e) {
      console.log('Firebase error: ', e);
    }
  };
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <ContextProvider value={{hasPermissions, fbToken}}>
      {children}
    </ContextProvider>
  );
};

export default NotificationsContextProvider;

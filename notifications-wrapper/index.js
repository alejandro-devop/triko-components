import {ACTIVATING_STATE, ACTIVE_STATE} from 'config/user-statuses';
import NotificationPermissionsBox from './notification-permissions-box';
import NotificationsProvider from './NotificationsContenxtProvider';
import React, {useEffect} from 'react';
import {useSession} from 'hooks/index';

const NotificationsWrapper = ({children}) => {
  const {
    stack: {logged, user = {}, hasNotifyPermissions},
    setKey,
  } = useSession();
  useEffect(() => {
    setKey('hasNotifyPermissions', false);
  }, []);

  if (!logged || ![ACTIVE_STATE, ACTIVATING_STATE].includes(user.workflow)) {
    return children;
  }
  console.log('hasNotification permissions: ', hasNotifyPermissions);
  return hasNotifyPermissions ? (
    <NotificationsProvider>{children}</NotificationsProvider>
  ) : (
    <>
      {children}
      <NotificationPermissionsBox />
    </>
  );
};

export default NotificationsWrapper;

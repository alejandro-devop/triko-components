import useSession from 'shared/hooks/use-session-client';
import {ACTIVE_STATE} from 'config/user-statuses';
import NotificationPermissionsBox from './notification-permissions-box';
import NotificationsProvider from './NotificationsContenxtProvider';
import React from 'react';

const NotificationsWrapper = ({children}) => {
  const {
    stack: {logged, user = {}, hasNotifyPermissions},
  } = useSession();
  if (!logged || user.workflow !== ACTIVE_STATE) {
    return children;
  }

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

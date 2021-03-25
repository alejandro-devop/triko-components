import {ACTIVATING_STATE, ACTIVE_STATE} from 'config/user-statuses';
import NotificationPermissionsBox from './notification-permissions-box';
import NotificationsProvider from './NotificationsContenxtProvider';
import React from 'react';
import {useSession} from 'hooks/index';

const NotificationsWrapper = ({children}) => {
  const {
    stack: {logged, user = {}, hasNotifyPermissions},
  } = useSession();
  if (!logged || ![ACTIVE_STATE, ACTIVATING_STATE].includes(user.workflow)) {
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

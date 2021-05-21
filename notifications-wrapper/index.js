import {
  ACTIVATING_STATE,
  ACTIVE_STATE,
  REQUIRED_DOC_STATE,
} from 'config/user-statuses';
import NotificationPermissionsBox from './notification-permissions-box';
import NotificationsProvider from './NotificationsContenxtProvider';
import React, {useEffect} from 'react';
import {useSession} from 'hooks/index';

const NotificationsWrapper = ({children, message}) => {
  const {
    stack: {logged, user = {}, hasNotifyPermissions},
    setKey,
  } = useSession();
  useEffect(() => {
    setKey('hasNotifyPermissions', false);
  }, []);
  if (
    !logged ||
    ![ACTIVE_STATE, ACTIVATING_STATE, REQUIRED_DOC_STATE].includes(
      user.workflow,
    )
  ) {
    return children;
  }
  return hasNotifyPermissions ? (
    <NotificationsProvider>{children}</NotificationsProvider>
  ) : (
    <>
      {children}
      <NotificationPermissionsBox message={message} />
    </>
  );
};

export default NotificationsWrapper;

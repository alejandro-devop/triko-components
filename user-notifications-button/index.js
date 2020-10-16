import React from 'react';
import Button from './button';
import useNavigate from 'shared/hooks/use-navigate';

/**
 * This component renders the notifications button
 * @returns {null|*}
 * @constructor
 */
const UserNotificationButton = () => {
  const {navigation} = useNavigate();
  const total = 1;
  const onViewNotifications = () => {
    navigation.navigate('notifications-panel');
  };
  if (total === 0) {
    return null;
  }
  return <Button count={total} onPress={onViewNotifications} />;
};

export default UserNotificationButton;

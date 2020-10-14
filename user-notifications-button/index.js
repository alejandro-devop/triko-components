import React from 'react';
import Button from './Button';

const UserNotificationButton = () => {
  const total = 1;
  const onViewNotifications = () => {
    alert('View notifications');
  };
  return <Button count={total} onPress={onViewNotifications} />;
};

export default UserNotificationButton;

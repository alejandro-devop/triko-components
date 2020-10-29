import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Button from './button';
import useNavigate from 'shared/hooks/use-navigate';
import useUserNotifications from 'shared/hooks/use-user-notifications';

/**
 * This component renders the notifications button
 * @returns {null|*}
 * @constructor
 */
const UserNotificationButton = () => {
  const {navigation} = useNavigate();
  const {refresh, total = 0} = useUserNotifications();
  const onViewNotifications = () => {
    navigation.navigate('notifications-panel');
  };
  useFocusEffect(
    useCallback(() => {
      refresh();
      return () => {};
    }, []),
  );
  if (total === 0) {
    return null;
  }
  return <Button count={total} onPress={onViewNotifications} />;
};

export default UserNotificationButton;

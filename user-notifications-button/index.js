import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import Button from './button';
import useNavigate from 'shared/hooks/use-navigate';
import useUserNotifications from 'shared/hooks/use-user-notifications';

/**
 * This component renders the notifications button only, it displays
 * the notifications count fetched by the notifications service.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {null|*}
 * @constructor
 */
const UserNotificationButton = ({isTriko}) => {
  const {navigation} = useNavigate();
  const {refresh, total = 0} = useUserNotifications();
  const onViewNotifications = () => {
    navigation.navigate('notifications-panel');
  };
  /**
   * Every time the screen which contains this button gets focus, we need to ensure refresh
   * the notifications stack.
   */
  useFocusEffect(
    useCallback(() => {
      refresh();
      return () => {};
    }, []),
  );
  if (total === 0) {
    return null;
  }
  return (
    <Button count={total} isTriko={isTriko} onPress={onViewNotifications} />
  );
};

UserNotificationButton.propTypes = {
  /** Indicates to the component if it should should add a caret for trikos or not  */
  isTriko: PropTypes.bool,
};

UserNotificationButton.defaultProps = {
  isTriko: false,
};

export default UserNotificationButton;

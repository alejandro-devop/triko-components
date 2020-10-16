import React from 'react';
import {ScrollView} from 'shared/components/commons';
import useUserNotifications from 'shared/hooks/use-user-notifications';
import Loader from './loader';
import NotificationCard from './notification-card';
import EmptyList from './EmptyList';

/**
 * This component renders the user notifications
 * @version 1.0.0
 * @returns {*}
 * @constructor
 */
const UserNotifications = () => {
  const {loading, notifications = [], refresh} = useUserNotifications();
  return (
    <ScrollView>
      {loading && <Loader />}
      {!loading && notifications.length === 0 && <EmptyList />}
      {!loading &&
        notifications.map((item, key) => (
          <NotificationCard
            delay={(key + 1) * 100}
            key={`notification-card-${key}`}
            notification={item}
            onNotifyUpdated={refresh}
          />
        ))}
    </ScrollView>
  );
};

export default UserNotifications;

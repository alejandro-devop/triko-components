import {useContext} from 'react';
import {NotificationsContext} from './index';

export const useNotificationProvider = () => {
  const context = useContext(NotificationsContext) || {};
  return context;
};

export default useNotificationProvider;

import React from 'react';
import {View} from 'react-native';
import Wrapper from './Wrapper';
import NotificationItem from './NotificationItem';
import useRequest from 'hooks/useRequest';
import useNotifications from 'shared/hooks/use-notification';
import useNavigate from 'shared/hooks/use-navigate';

const TYPE_SERVICE_EXECUTION = 'service-execution';
const TYPE_SERVICE_ACCEPTED = 'service-accepted';

/**
 * This component allows to display stack notifications on top
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @returns {null|*}
 * @constructor
 */
const NotificationStack = () => {
  const {notifications = [], removeNotify} = useNotifications();
  const {navigation} = useNavigate();
  const {setSelectedToExecution} = useRequest();
  const [firstNotify] = notifications;
  const onRemoveNotify = (idToRemove) => {
    removeNotify(idToRemove);
  };
  const onSelectNotify = (notify) => {
    const {type, data = {}, id} = notify;
    let path = null;
    if (type === TYPE_SERVICE_ACCEPTED) {
      path = 'services/pending';
    } else if (type === TYPE_SERVICE_EXECUTION) {
      path = 'execution';
      setSelectedToExecution(data.id);
    }
    onRemoveNotify(id);
    if (path) {
      navigation.navigate(path);
    }
  };

  if (notifications.length === 0) {
    return null;
  }
  return (
    <Wrapper>
      <View>
        {firstNotify && (
          <>
            <NotificationItem
              onClose={() => onRemoveNotify(firstNotify.id)}
              onSelect={() => onSelectNotify(firstNotify)}
              notification={firstNotify}
            />
          </>
        )}
      </View>
    </Wrapper>
  );
};

export default NotificationStack;

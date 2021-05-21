import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import styles from './styles';
import {useSession} from 'hooks/index';
import {useStyles} from '@triko-app/hooks';
import Text from 'shared/components/base/text';
import Button from 'shared/components/base/buttons/button';
import useHasNotifyPermission, {
  useRequestNotificationPermission,
} from 'shared/hooks/use-has-notify-permission';

const NotificationPermissionsBox = ({
  message = 'notifications_permissions_explanation',
}) => {
  const [classes] = useStyles(styles);
  const [] = useRequestNotificationPermission();
  const [hasPermission, checkPermission] = useHasNotifyPermission();
  const [requestPermission, openSettings] = useRequestNotificationPermission();
  let timer = null;
  const [shouldRender, setShouldRender] = useState(false);
  const {
    stack: {blockNotificationPermissionsBox},
    setKey,
  } = useSession();

  const handleRequestPermissions = async () => {
    const response = await requestPermission();
    if (response === 'blocked') {
      openSettings();
    } else if (response === 'granted') {
      checkPermission();
      clearInterval(timer);
    }
  };

  useEffect(() => {
    if (!hasPermission && !timer) {
      timer = setInterval(() => {
        setShouldRender(true);
        checkPermission();
      }, 2000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [hasPermission]);

  const handleClose = () => {
    setKey('blockNotificationPermissionsBox', true);
    clearInterval(timer);
  };

  if (blockNotificationPermissionsBox || hasPermission || !shouldRender) {
    return null;
  }

  return (
    <SafeAreaView style={classes.root}>
      <View style={classes.wrapper}>
        <View style={classes.boxWrapper}>
          <View style={classes.textWrapper}>
            <Text style={classes.text}>{message}</Text>
            <View style={classes.actions}>
              <Button size="xxs" primary onPress={handleRequestPermissions}>
                allow_notifications_text
              </Button>
              <Button size="xxs" secondary onPress={handleClose}>
                close_text
              </Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationPermissionsBox;

import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import styles from './styles';
import {useSession, useStyles} from 'hooks/index';
import Text from 'shared/components/base/text';
import Button from 'shared/components/base/buttons/button';
import useHasNotifyPermission, {
  useRequestNotificationPermission,
} from 'shared/hooks/use-has-notify-permission';

const NotificationPermissionsBox = () => {
  const [classes] = useStyles(styles);
  const [] = useRequestNotificationPermission();
  const [hasPermission, checkPermission] = useHasNotifyPermission();
  const [requestPermission, openSettings] = useRequestNotificationPermission();
  let timer = null;
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

  if (blockNotificationPermissionsBox || hasPermission) {
    return null;
  }

  return (
    <SafeAreaView style={classes.root}>
      <View style={classes.wrapper}>
        <View style={classes.boxWrapper}>
          <View style={classes.textWrapper}>
            <Text style={classes.text}>
              notifications_permissions_explanation
            </Text>
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

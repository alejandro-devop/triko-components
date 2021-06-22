import React from 'react';
import {Linking, View} from 'react-native';
import {useSession} from 'hooks/index';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';
import Text from 'shared/components/base/text';
import Button from 'shared/components/base/buttons/button';
import {ScrollView} from 'shared/components/commons';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';

const NoTrackingPermission = () => {
  const [classes] = useStyles(styles);
  const {
    stack: {},
    setKey,
  } = useSession();

  const checkStatus = async () => {
    const trackingStatus = await getTrackingStatus();
    if (trackingStatus === 'not-determined') {
      const response = await requestTrackingPermission();
      if (response === 'denied') {
        setKey('trackingPermissions', false);
        goToSetting();
      }
    } else if (trackingStatus === 'denied') {
      setKey('trackingPermissions', false);
      goToSetting();
    }
  };

  const goToSetting = () => {
    Linking.openSettings();
  };

  return (
    <View style={classes.root}>
      <ScrollView>
        <View style={classes.descriptionContainer}>
          <Text variant="title" style={classes.descriptionTitle}>
            tracking_permissions
          </Text>
          <Text variant="caption" style={classes.descriptionText}>
            why_do_we_need_tracking_permissions
          </Text>
        </View>
        <View style={classes.actionsButtons}>
          <Button primary onPress={checkStatus}>
            allow_text
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default NoTrackingPermission;

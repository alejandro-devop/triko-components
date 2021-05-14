import React from 'react';
import {Linking, View} from 'react-native';
import {useSession, useStyles} from 'hooks/index';
import styles from './styles';
import Text from 'shared/components/base/text';
import Button from 'shared/components/base/buttons/button';
import trackingEs from 'assets/tracking-permission-es.png';
import trackingEn from 'assets/tracking-permission-en.png';
import PreImage from 'shared/components/base/pre-image';
import {ScrollView} from 'shared/components/commons';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';

const images = {
  es: trackingEs,
  en: trackingEn,
};

const NoTrackingPermission = () => {
  const [classes] = useStyles(styles);
  const {
    stack: {locale},
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
          <Text variant="" style={classes.descriptionText}>
            ask_to_allow_access
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
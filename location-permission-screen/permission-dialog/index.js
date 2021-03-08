import React, {useState} from 'react';
import {Linking, Platform, View} from 'react-native';
import Text from 'components/base/text';
import Dialog from 'shared/components/dialogs/dialog';
import styles from './styles';
import {useStyles} from 'hooks/index';
import Button from 'components/base/buttons/button';
import {
  ANDROID_PERMISSIONS,
  IOS_PERMISSIONS,
} from 'shared/components/permissions-manager';
import {request} from 'react-native-permissions';
import useNotify from 'shared/hooks/use-notification';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import CheckboxField from 'shared/components/base/controls/checkbox-field';
import classNames from 'shared/utils/classnames';
import {LoadingCurtain} from 'components/base/dialogs';

const PermissionDialog = ({
  disableDialog,
  features = [],
  hideAskAgain,
  loading,
  onGranted,
  open,
  onClose,
}) => {
  const [classes] = useStyles(styles);
  const {error} = useNotify();
  const reportError = useErrorReporter({
    path: 'src/shared/components/location-permission-checker/index.js',
  });
  const [notShowAgain, setNotShowAgain] = useState(false);
  const handleClose = () => {
    onClose(notShowAgain);
  };
  const handleRequestPermissions = async () => {
    try {
      const permissionName =
        Platform.OS === 'ios'
          ? IOS_PERMISSIONS.location
          : ANDROID_PERMISSIONS.location;
      const response = await request(permissionName);
      if (response === 'unavailable' || response === 'blocked') {
        Linking.openSettings();
        onClose();
      } else if (response === 'granted' && onGranted) {
        onGranted();
      }
    } catch (e) {
      reportError(e);
      error('Error while requesting the permission');
    }
  };

  const content = (
    <View
      style={classNames({wrapper: true, wrapperWide: disableDialog}, classes)}>
      <View style={classes.descriptionContainer}>
        <Text style={classes.descriptionText}>
          why_we_need_location_permissions
        </Text>
      </View>
      <View style={classes.featuresWrapper}>
        {features.map((feature, key) => (
          <View key={`feature-${key}`} style={classes.featureWrapper}>
            <View style={classes.caret} />
            <Text style={classes.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <View style={classes.noteInfo}>
        <Text style={classes.noteInfoText}>note_text_location</Text>
      </View>
      <View style={classes.actions}>
        {!hideAskAgain && (
          <View style={classes.checkboxWrapper}>
            <CheckboxField
              onChange={() => setNotShowAgain(!notShowAgain)}
              label="not_show_again_this_message"
              value={notShowAgain}
            />
          </View>
        )}
        <Button onPress={handleRequestPermissions} primary>
          allow_location_access_text
        </Button>
        <Button onPress={handleClose}>close_text</Button>
      </View>
      {loading && <LoadingCurtain disableModal />}
    </View>
  );

  if (disableDialog) {
    return content;
  }

  return (
    <Dialog
      title="why_we_need_location_permissions_title"
      open={open}
      onClose={onClose}
      contentStyles={classes.root}>
      {content}
    </Dialog>
  );
};

export default PermissionDialog;

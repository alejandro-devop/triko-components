import React from 'react';
import PropTypes from 'prop-types';
import {AppState, PermissionsAndroid, Platform, Linking} from 'react-native';
import RNPermissions, {
  PERMISSIONS as RN_PERMISSSIONS,
} from 'react-native-permissions';
import BlackScreen from './BlackScreen';
import BlackScreenIOs from './BlackScreenIOs';
import LoadingCourtain from 'components/base/dialogs/loading-curtain';

export const PERMISSIONS = {
  ACCESS_CAMERA: 'camera',
  ACCESS_LOCATION: 'location',
  ACCESS_NOTIFICATIONS: 'notification',
  ACCESS_MICROPHONE: 'microphone',
  ACCESS_DOWNLOAD: 'download',
  ACCESS_FILES: 'files',
};

export const labels = {
  camera: 'permissions_camera',
  location: 'permissions_location',
  notification: 'permissions_notify',
  download: 'permission_download',
  files: 'permission_files',
  microphone: 'permissions_microphone',
};

export const IOS_PERMISSIONS = {
  files: RN_PERMISSSIONS.IOS.PHOTO_LIBRARY,
  calendar: RN_PERMISSSIONS.IOS.CALENDARS,
  camera: RN_PERMISSSIONS.IOS.CAMERA,
  location: RN_PERMISSSIONS.IOS.LOCATION_ALWAYS,
  photo_library: RN_PERMISSSIONS.IOS.PHOTO_LIBRARY,
  microphone: RN_PERMISSSIONS.IOS.MICROPHONE,
  download: RN_PERMISSSIONS.IOS.PHOTO_LIBRARY,
};
export const ANDROID_PERMISSIONS = {
  files: RN_PERMISSSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  camera: RN_PERMISSSIONS.ANDROID.CAMERA,
  location: RN_PERMISSSIONS.ANDROID.ACCESS_FINE_LOCATION,
  microphone: RN_PERMISSSIONS.ANDROID.RECORD_AUDIO,
  download: RN_PERMISSSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

class PermissionsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockedPermissions: [],
      checking: true,
      grantedPermissions: [],
      hasPermission: false,
      reRequest: false,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.detectFocus);
    if (Platform.OS === 'ios') {
      this.checkPermissionsIOs();
    } else {
      this.checkPermissions(true);
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.detectFocus);
  }

  detectFocus = async (appState) => {
    if (Platform.OS === 'ios') {
      this.checkPermissionsIOs();
    } else {
      this.checkPermissions(false);
    }
  };

  onRequestAgain = async () => {
    const {blockedPermissions = []} = this.state;
    if (blockedPermissions.length > 0) {
      this.setState(
        {
          grantedPermissions: [],
          blockedPermissions: [],
          reRequest: true,
        },
        () => {
          this.checkPermissions();
          Linking.openSettings();
        },
      );
    } else {
      this.requestPermissions();
    }
  };

  checkPermissions = async (request) => {
    try {
      const {permissions = [], onPermission} = this.props;
      const response = await Promise.all(
        permissions.map(
          async (permissionName) =>
            await PermissionsAndroid.check(ANDROID_PERMISSIONS[permissionName]),
        ),
      );
      const granted = [];
      const blocked = [];

      response.forEach((hasPermission, key) => {
        if (hasPermission === true) {
          granted.push(permissions[key]);
        } else {
          blocked.push(permissions[key]);
        }
      });

      this.setState(
        {
          checking: false,
          grantedPermissions: granted,
          blockedPermissions: blocked,
          hasPermission: granted.length === permissions.length,
        },
        () => {
          this.forceUpdate();
          if (onPermission) {
            onPermission();
          }
        },
      );
      if (request) {
        this.requestPermissions();
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  requestPermissions = async () => {
    try {
      const {permissions = [], onPermission} = this.props;
      const permissionsToValidate = permissions.map(
        (permission) => ANDROID_PERMISSIONS[permission],
      );
      const response = await PermissionsAndroid.requestMultiple(
        permissionsToValidate,
      );
      const granted = [];
      const blocked = [];
      permissions.forEach((permission) => {
        const permissionKey = ANDROID_PERMISSIONS[permission];
        const pAndroid = response[permissionKey] || false;
        if (pAndroid && pAndroid === 'granted') {
          granted.push(permission);
        } else if (pAndroid && pAndroid === 'never_ask_again') {
          blocked.push(permission);
        }
      });
      this.setState(
        {
          grantedPermissions: granted,
          blockedPermissions: blocked,
          hasPermission: permissions.length === granted.length,
        },
        () => {
          if (this.state.hasPermission && onPermission) {
            onPermission();
          }
        },
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  checkPermissionsIOs = async () => {
    try {
      const {permissions = [], onPermission} = this.props;
      const granted = [];
      const blocked = [];
      const permissionStatuses = await Promise.all(
        permissions.map(
          async (permissionName) =>
            await RNPermissions.check(IOS_PERMISSIONS[permissionName]),
        ),
      );

      permissionStatuses.forEach((status, key) => {
        if (status === 'granted') {
          granted.push(permissions[key]);
        } else if (status === 'blocked') {
          blocked.push(permissions[key]);
        }
      });
      this.setState(
        {
          blockedPermissions: blocked,
          checking: false,
          grantedPermissions: granted,
          hasPermission: granted.length === permissions.length,
        },
        () => {
          if (onPermission) {
            onPermission();
          }
        },
      );
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  hasPermission = (permissionName) =>
    this.state.grantedPermissions.includes(permissionName);

  onRequestIOs = async (permission) => {
    try {
      const {grantedPermissions, blockedPermissions} = this.state;
      const {permissions = [], onPermission} = this.props;
      const granted = [...grantedPermissions];
      const blocked = [...blockedPermissions];
      if (blockedPermissions.includes(permission)) {
        Linking.openSettings();
      } else {
        const response = await RNPermissions.request(
          IOS_PERMISSIONS[permission],
        );
        if (response === 'granted') {
          granted.push(permission);
        } else {
          blocked.push(permission);
        }
        this.setState(
          {
            grantedPermissions: granted,
            blockedPermissions: blocked,
            hasPermission: granted.length === permissions.length,
          },
          () => {
            this.forceUpdate();
            if (this.state.hasPermission && onPermission) {
              onPermission();
            }
          },
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {children, permissions = [], message} = this.props;
    const {hasPermission, grantedPermissions, checking, reRequest} = this.state;
    let component = null;
    let loader = false;
    if (!hasPermission && Platform.OS === 'ios') {
      component = (
        <BlackScreenIOs
          message={message}
          granted={grantedPermissions}
          labels={labels}
          onRequest={this.onRequestIOs}
          requested={permissions}
        />
      );
    } else if (!hasPermission && Platform.OS === 'android') {
      loader = true;
      component = (
        <BlackScreen reRequest={reRequest} onRequest={this.onRequestAgain} />
      );
    } else {
      component = children;
    }

    return (
      <>
        {component}
        {checking && loader && <LoadingCourtain />}
      </>
    );
  }
}

PermissionsManager.propTypes = {
  children: PropTypes.node,
  Fallback: PropTypes.oneOfType([PropTypes.any]),
  onPermission: PropTypes.func,
  permissions: PropTypes.arrayOf(PropTypes.string),
};

export default PermissionsManager;

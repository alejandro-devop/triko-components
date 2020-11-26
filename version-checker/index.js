import React from 'react';
import useRegionConfig from 'hooks/useRegionConfig';
import NeedUpdate from './NeedUpdate';
import {APP_VERSION} from 'react-native-dotenv';

const VersionChecker = ({children}) => {
  const {appVersion} = useRegionConfig();
  return appVersion === APP_VERSION ? children : <NeedUpdate />;
};

export default VersionChecker;

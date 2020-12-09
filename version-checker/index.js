import React, {useEffect} from 'react';
import useRegionConfig from 'hooks/useRegionConfig';
import NeedUpdate from './NeedUpdate';
import {APP_VERSION, ENV} from 'react-native-dotenv';
import {useQuery} from '@apollo/react-hooks';
import {GET_REGION_CONFIG} from '../../../contexts/configuration/queries';
import {useSession} from 'hooks/index';

const VersionChecker = ({children}) => {
  const {appVersion} = useRegionConfig();
  const {
    stack: {regionId},
    setKey,
  } = useSession();
  let timer = null;
  const {refetch} = useQuery(GET_REGION_CONFIG, {
    fetchPolicy: 'no-cache',
    variables: {
      region: regionId,
    },
    onCompleted: ({response}) => {
      setKey('regionalConfig', response);
    },
  });

  console.log('App version: ', appVersion, APP_VERSION, ENV);

  const needUpdate = appVersion !== APP_VERSION;

  useEffect(() => {
    if (needUpdate) {
      timer = setTimeout(() => {
        refetch();
      }, 10000);
    } else {
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [needUpdate]);

  return !needUpdate ? children : <NeedUpdate />;
};

export default VersionChecker;

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import useRegionConfig from 'hooks/useRegionConfig';
import NeedUpdate from './NeedUpdate';
import {APP_VERSION} from 'react-native-dotenv';
import {useQuery} from '@apollo/react-hooks';
import {GET_REGION_CONFIG} from '../../../contexts/configuration/queries';
import {useSession} from 'hooks/index';

/**
 * This component verifies if the current version matches the published version in the server, if it doesn't
 * it shows a screen asking the user to update his application.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param children
 * @returns {*}
 * @constructor
 */
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

VersionChecker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VersionChecker;

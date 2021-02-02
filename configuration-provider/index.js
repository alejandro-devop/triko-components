import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import {GET_REGION_CONFIG} from './queries';
import useSession from 'hooks/useSession';
import LoaderScreen from 'components/base/loaders/LoaderScreen';

export const ConfigContext = React.createContext({});
const ContextProvider = ConfigContext.Provider;

/**
 * Provides application configurations based on api data.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version  1.0.0
 * @param children
 * @returns {*}
 * @constructor
 */
const ConfigurationProvider = ({children}) => {
  const {
    stack: {regionId, regionalConfig},
    setKey,
  } = useSession();
  const {loading, refetch} = useQuery(GET_REGION_CONFIG, {
    fetchPolicy: 'no-cache',
    pollInterval: 60000,
    variables: {
      region: regionId,
    },
    onCompleted: ({response}) => {
      setKey('regionalConfig', response);
    },
  });

  const refreshTerms = () => {
    refetch();
  };
  return (
    <ContextProvider
      value={{
        config: regionalConfig,
        refresh: refreshTerms,
      }}>
      {loading && <LoaderScreen />}
      {!loading && children}
    </ContextProvider>
  );
};

ConfigurationProvider.propTypes = {
  children: PropTypes.children,
};

export default ConfigurationProvider;

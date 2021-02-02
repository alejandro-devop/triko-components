import {GET_REGION_CONFIG} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useState} from 'react';
import {useSession} from 'hooks/index';

/**
 * Hook to update the regional config for the application
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{refresh: *, loading: *, config: *}}
 */
const useRegionConfigFetch = () => {
  const {
    stack: {regionId, regionalConfig},
    setKey,
  } = useSession();
  const [loading, setLoading] = useState(true);
  const {refetch} = useQuery(GET_REGION_CONFIG, {
    fetchPolicy: 'cache-and-network',
    variables: {
      region: regionId,
    },
    onCompleted: ({response}) => {
      setKey('regionalConfig', response);
      setLoading(false);
    },
  });

  const refresh = async () => {
    refetch();
  };
  return {config: regionalConfig, loading, refresh};
};

export default useRegionConfigFetch;

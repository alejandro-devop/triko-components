import {useState} from 'react';
import {GET_MARKET_PLACES, SAVE_MARKET_PLACE} from './queries';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'hooks/useNotification';

export const useMarketsList = (options = {}) => {
  const {categories = [], query} = options;
  const {
    stack: {locale},
  } = useSession();
  const {data = {}, loading} = useQuery(GET_MARKET_PLACES, {
    fetchPolicy: 'no-cache',
    variables: {
      name: query,
      categories: JSON.stringify(categories),
      locale,
    },
  });

  return {
    places: data.response && Array.isArray(data.response) ? data.response : [],
    loading,
  };
};

export const useSaveMarketPlace = () => {
  const [loading, setLoading] = useState(false);
  const {error} = useNotify();
  const [sendRequest] = useMutation(SAVE_MARKET_PLACE);
  const reportError = useErrorReporter({
    path: 'src/shared/components/base/controls/market-place-picker/hooks.js',
  });
  const saveMarket = async (payload = {}) => {
    const {
      city,
      categories = [],
      name,
      address,
      lat,
      lng,
      description,
    } = payload;
    setLoading(true);
    try {
      await sendRequest({
        variables: {
          city,
          categories: JSON.stringify(categories),
          name,
          address,
          lat,
          lng,
          description,
          attrs: JSON.stringify({}),
        },
      });
      setLoading(false);
    } catch (e) {
      reportError(e);
      error('Error while saving the store');
      setLoading(false);
    }
  };

  return {
    loading,
    saveMarket,
  };
};

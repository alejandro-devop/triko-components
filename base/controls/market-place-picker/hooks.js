import {GET_MARKET_PLACES} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';

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

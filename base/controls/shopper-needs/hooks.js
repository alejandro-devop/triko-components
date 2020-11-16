import {GET_CATEGORIES} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';
const useMarketCategories = () => {
  const {
    stack: {regionId, locale},
  } = useSession();
  const {data = {}, loading} = useQuery(GET_CATEGORIES, {
    variables: {
      region: regionId,
      locale,
    },
  });
  return {
    loading,
    categories:
      data.response && Array.isArray(data.response) ? data.response : [],
  };
};

export default useMarketCategories;

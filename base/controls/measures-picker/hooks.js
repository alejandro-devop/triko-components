import {GET_MEASURES} from './queries';
import {useSession} from 'hooks/index';
import {useQuery} from '@apollo/react-hooks';

export const useMeasures = () => {
  const {
    stack: {locale, regionId},
  } = useSession();
  const {data = {}, loading} = useQuery(GET_MEASURES, {
    variables: {
      locale,
      region: regionId,
    },
  });

  return {
    measures:
      data.response && Array.isArray(data.response) ? data.response : [],
    loading,
  };
};

import {useQuery} from '@apollo/react-hooks';
import {GET_BUILDING_TYPES} from 'shared/components/base/home-type-picker/queries';
import {useSession} from 'hooks/index';

/**
 * Hook to list the building types.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param options
 * @returns {{homeTypes: *, loading: *}}
 */
export const useBuildingTypesList = (options = {}) => {
  const {onCompleted} = options;
  const {
    stack: {locale},
  } = useSession();
  const {loading, data = {}} = useQuery(GET_BUILDING_TYPES, {
    variables: {
      locale,
    },
    onCompleted: ({response = []}) => {
      if (onCompleted) {
        onCompleted(response);
      }
    },
  });
  const homeTypes = data.response ? data.response : [];
  return {
    loading,
    homeTypes,
  };
};

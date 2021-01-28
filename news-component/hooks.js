import {useQuery} from '@apollo/react-hooks';
import {GET_POSTS} from './queries';
import {useSession} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';

/**
 * Lists the user published posts
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param options {{ id: number, noClient: boolean }}
 * @returns {{refresh: Promise, loading: boolean, posts: Array}}
 */
const useUserPosts = (options = {}) => {
  const {id, noClient, onlyOwned, onlyPublic, clientId} = options;
  const {
    stack: {client = {}, locale},
  } = useSession();
  const {data = {}, loading, refetch} = useQuery(GET_POSTS, {
    fetchPolicy: 'no-cache',
    pollInterval: 30000,
    variables: {
      id: id,
      client: clientId,
      locale,
      onlyOwned,
      onlyPublic,
    },
  });
  const posts =
    !isEmpty(data) && Array.isArray(data.response) ? data.response : [];

  const refresh = async () => {
    await refetch();
  };
  return {
    loading,
    posts,
    refresh,
  };
};

export default useUserPosts;

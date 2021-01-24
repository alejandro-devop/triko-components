import {useQuery} from '@apollo/react-hooks';
import {GET_POSTS} from './queries';
import {useSession} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';

const useUserPosts = (options = {}) => {
  const {id, noClient} = options;
  const {
    stack: {client = {}},
  } = useSession();
  const {data = {}, loading} = useQuery(GET_POSTS, {
    variables: {
      id: id,
      client: !noClient ? client.id : null,
    },
  });
  const posts =
    !isEmpty(data) && Array.isArray(data.response) ? data.response : [];
  return {
    loading,
    posts,
  };
};

export default useUserPosts;

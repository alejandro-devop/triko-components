import {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_POSTS_TRIKO, GET_POSTS_CLIENT} from './queries';
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
  const {id, onlyOwned, onlyPublic, clientId, isTriko, trikoId} = options;
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const {
    stack: {locale},
  } = useSession();
  const {data = {}, loading, refetch} = useQuery(
    isTriko ? GET_POSTS_TRIKO : GET_POSTS_CLIENT,
    {
      fetchPolicy: 'network-only',
      variables: {
        id: id,
        locale,
        onlyOwned: Boolean(onlyOwned),
        onlyPublic: Boolean(onlyPublic),
        ...(isTriko ? {triko: trikoId} : {client: clientId}),
      },
      onCompleted: () => {
        setLoaded(true);
      },
    },
  );

  const posts =
    !isEmpty(data) && Array.isArray(data.response) ? data.response : [];

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return {
    loading,
    posts,
    refresh,
    refreshing,
    loaded,
  };
};

export default useUserPosts;

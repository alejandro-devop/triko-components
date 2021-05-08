import {useSession} from 'hooks/index';
import {useQuery} from '@apollo/react-hooks';
import {GET_FRIENDSHIP_REQUESTS} from './queries';
import {isEmpty} from 'shared/utils/functions';

export const useFriendshipRequests = () => {
  const {
    stack: {
      client = {},
      locale,
      myFriends = [],
      myFriendsCount = 0,
      friendshipRequests = [],
    },
    setAll,
  } = useSession();
  const {refetch} = useQuery(GET_FRIENDSHIP_REQUESTS, {
    pollInterval: 30000,
    fetchPolicy: 'no-cache',
    onCompleted: ({received = {}, send = {}}) => {
      const {friends: friendsCount = 0, friendship = {}} = received;
      const {byMe} = send;
      const {requests = [], friends = []} = !isEmpty(friendship)
        ? friendship
        : {};
      setAll({
        mySendFriendshipRequests: byMe,
        sendFriendshipRequestsIds: byMe.map((item) => item.id),
        myFriends: friends,
        myFriendsIds: friends.map((item) => item.id),
        myFriendsCount: friendsCount,
        friendshipRequests: requests,
        friendShipRequestsIds: requests.map((item) => item.id),
      });
    },
    variables: {
      client: client.id,
      locale,
    },
  });
  const refresh = async () => {
    await refetch();
  };
  return {
    friendshipRequests,
    myFriends,
    myFriendsCount,
    refresh,
  };
};

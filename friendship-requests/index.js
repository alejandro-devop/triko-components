import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';
import {useSession} from 'hooks/index';
import RequestItem from './request-item';
import Text from 'shared/components/base/text';
import {useFriendshipRequests} from 'shared/components/friendship-requests/hooks';
import useNavigate from 'shared/hooks/use-navigate';

const FriendshipRequests = () => {
  const [classes] = useStyles(styles);
  const {
    stack: {friendshipRequests: requests = []},
  } = useSession();
  const {refresh} = useFriendshipRequests();
  const {navigation} = useNavigate();
  const handleViewProfile = ({id}) => {
    navigation.navigate('client-profile', {clientId: id});
  };
  return (
    <View style={classes.root}>
      {requests.length === 0 && (
        <View style={classes.empty}>
          <Text variant="caption" style={classes.noRequests}>
            no_friendship_requests
          </Text>
        </View>
      )}
      {requests.map((item, key) => (
        <RequestItem
          delay={key * 100}
          key={`request-item-${key}`}
          item={item}
          onViewProfile={() => handleViewProfile(item)}
          onRequestSend={refresh}
        />
      ))}
    </View>
  );
};

export default FriendshipRequests;

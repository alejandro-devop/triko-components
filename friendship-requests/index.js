import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import {useSession} from 'hooks/index';
import RequestItem from './request-item';
import Text from 'shared/components/base/text';
import {useFriendshipRequests} from 'shared/components/friendship-requests/hooks';

const FriendshipRequests = () => {
  const [classes] = useStyles(styles);
  const {
    stack: {friendshipRequests: requests = []},
  } = useSession();
  const {refresh} = useFriendshipRequests();
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
          onRequestSend={refresh}
        />
      ))}
    </View>
  );
};

export default FriendshipRequests;

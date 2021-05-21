import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';
import Text from 'shared/components/base/text';
import Icon from 'components/base/icon';
import useNavigate from 'shared/hooks/use-navigate';
import {useSession} from 'hooks/index';

const FriendsRequestsCountBadge = () => {
  const [classes] = useStyles(styles);
  const {navigation} = useNavigate();
  const {
    stack: {friendshipRequests = []},
  } = useSession();
  const count = friendshipRequests.length;
  const handleOnPress = () => navigation.navigate('friendship-requests');

  return (
    <View style={classes.wrapper}>
      <TouchableOpacity onPress={handleOnPress} style={classes.root}>
        <View style={classes.iconWrapper}>
          <Icon name="bell" style={classes.icon} />
        </View>
        <View style={classes.textWrapper}>
          <Text style={classes.text}>{count}</Text>
        </View>
      </TouchableOpacity>
      <Text style={classes.textLabel}>requests_text</Text>
    </View>
  );
};

export default FriendsRequestsCountBadge;

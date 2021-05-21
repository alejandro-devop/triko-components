import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';
import Text from 'shared/components/base/text';
import Icon from 'components/base/icon';
import useNavigate from 'shared/hooks/use-navigate';
import {useSession} from 'hooks/index';

const FriendsCountBadge = () => {
  const [classes] = useStyles(styles);
  const {navigation} = useNavigate();
  const {
    stack: {myFriendsCount = 0},
  } = useSession();
  const handleOnPress = () => navigation.navigate('my-friends');
  return (
    <View style={classes.wrapper}>
      <TouchableOpacity onPress={handleOnPress} style={classes.root}>
        <View style={classes.iconWrapper}>
          <Icon name="users" style={classes.icon} />
        </View>
        <View style={classes.textWrapper}>
          <Text style={classes.text}>{myFriendsCount}</Text>
        </View>
      </TouchableOpacity>
      <Text style={classes.textLabel}>friends_text</Text>
    </View>
  );
};

export default FriendsCountBadge;

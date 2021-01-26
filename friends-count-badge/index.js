import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import Text from 'shared/components/base/text';
import Icon from 'components/base/icon';
import useNavigate from 'shared/hooks/use-navigate';

const FriendsCountBadge = () => {
  const [classes] = useStyles(styles);
  const {navigation} = useNavigate();
  const count = 0;
  const handleOnPress = () => navigation.navigate('my-friends');
  return (
    <View style={classes.wrapper}>
      <TouchableOpacity onPress={handleOnPress} style={classes.root}>
        <View style={classes.iconWrapper}>
          <Icon name="users" style={classes.icon} />
        </View>
        <View style={classes.textWrapper}>
          <Text style={classes.text}>{count}</Text>
        </View>
      </TouchableOpacity>
      <Text style={classes.textLabel}>friends_text</Text>
    </View>
  );
};

export default FriendsCountBadge;

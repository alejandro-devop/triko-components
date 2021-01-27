import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import PreImage from 'shared/components/base/pre-image';
import {isEmpty} from 'shared/utils/functions';
import defaultImage from 'assets/avatars/profile-photo.jpg';

const FriendItem = ({item = {}}) => {
  const [classes] = useStyles(styles);
  const {user = {}, pi = {}} = item;
  const {} = pi;
  const {photo} = user;
  return (
    <View style={classes.root}>
      <View style={classes.avatarWrapper}>
        <PreImage
          style={classes.avatar}
          source={!isEmpty(photo) ? {uri: photo} : defaultImage}
        />
      </View>
    </View>
  );
};

export default FriendItem;

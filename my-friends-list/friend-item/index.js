import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';
import PreImage from 'shared/components/base/pre-image';
import {isEmpty} from 'shared/utils/functions';
import defaultImage from 'assets/avatars/profile-photo.jpg';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import Slide from 'shared/components/anims/Slide';
import useNavigate from 'shared/hooks/use-navigate';

const FriendItem = ({delay = 0, item = {}, onRemove}) => {
  const [classes] = useStyles(styles);
  const {user = {}, pi = {}} = item;
  const {firstName, lastName} = pi;
  const {photo} = user;
  const {navigation} = useNavigate();
  const handleRemove = () => {
    onRemove(item);
  };
  const handleViewProfile = () => {
    navigation.navigate('client-profile', {clientId: item.id});
  };
  return (
    <Slide delay={delay} direction="right" style={classes.root}>
      <TouchableOpacity
        onPress={handleViewProfile}
        style={classes.avatarWrapper}>
        <PreImage
          style={classes.avatar}
          source={!isEmpty(photo) ? {uri: photo} : defaultImage}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleViewProfile} style={classes.textWrapper}>
        <Text style={classes.label}>{`${firstName} ${lastName}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={classes.buttonWrapper} onPress={handleRemove}>
        <Icon name="trash" style={classes.icon} />
      </TouchableOpacity>
    </Slide>
  );
};

export default FriendItem;

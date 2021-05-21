import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'components/base/text';
import Avatar from 'main/components/base/avatar';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const ClientProfile = ({client = {}}) => {
  const [classes] = useStyles(styles);
  const {user = {}, pi = {}} = client;
  const {photo_url: photo} = user;
  const {first_name, last_name} = pi;
  const fullName = `${first_name} ${last_name ? last_name.substr(0, 1) : ''}.`;
  return (
    <View style={classes.root}>
      <View style={classes.whiteBar} />
      <Text style={classes.fullName}>{fullName}</Text>
      <View style={classes.avatarWrapper}>
        <Avatar size={70} style={classes.avatar} url={photo} />
      </View>
    </View>
  );
};

ClientProfile.propTypes = {
  client: PropTypes.shape({
    fullName: PropTypes.string,
    photo: PropTypes.string,
  }),
};

export default ClientProfile;

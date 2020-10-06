import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import PreImage from 'shared/components/base/pre-image';
import Text from 'components/base/text';
import defaultAvatar from 'assets/avatars/profile-photo.jpg';
import styles from './styles';

/**
 * This component renders the client information for the request card
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param client
 * @returns {*}
 * @constructor
 */
const ClientInfo = ({client = {}}) => {
  const [classes] = useStyles(styles);
  const {
    user: {photo_url},
    pi: {first_name: firstName, last_name: lastName},
  } = client;
  return (
    <View style={classes.root}>
      <View style={classes.avatarWrapper}>
        <PreImage
          source={photo_url ? {uri: photo_url} : defaultAvatar}
          style={classes.avatar}
        />
      </View>
      <View style={classes.infoWrapper}>
        <Text style={classes.fullName}>{`${firstName} ${lastName[0]}.`}</Text>
      </View>
    </View>
  );
};

ClientInfo.propTypes = {
  client: PropTypes.shape({
    user: PropTypes.shape({
      photo_url: PropTypes.string,
    }),
    pi: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }),
};

export default ClientInfo;

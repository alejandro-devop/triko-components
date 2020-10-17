import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, View} from 'react-native';
import useStyles from 'hooks/useStyles';
import Text from 'components/base/text';
import defaultPhoto from 'assets/avatars/real-profile-photo.jpg';
import CircleButton from 'components/base/buttons/circle-button';
import PreImage from 'components/pre-image';
import styles from './styles';
import Slide from 'shared/components/anims/Slide';

/**
 * This component only renders the user's avatar which the current user is chatting with.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param onClose
 * @param photo
 * @param name
 * @returns {*}
 * @constructor
 */
const AvatarWrapper = ({onClose, photo, name}) => {
  const [classes] = useStyles(styles);
  return (
    <Slide direction="top" delay={500}>
      <SafeAreaView style={classes.root}>
        <View style={classes.contentWrapper}>
          <View style={classes.imageWrapper}>
            <PreImage
              style={classes.image}
              source={photo ? {uri: photo} : defaultPhoto}
            />
          </View>
          <View style={classes.textWrapper}>
            <Text style={classes.label}>{name}</Text>
          </View>
          <View style={classes.backActionWrapper}>
            <CircleButton onPress={onClose} name="times" />
          </View>
        </View>
      </SafeAreaView>
    </Slide>
  );
};

AvatarWrapper.propTypes = {
  onClose: PropTypes.func,
  photo: PropTypes.string,
  name: PropTypes.string,
};

export default AvatarWrapper;

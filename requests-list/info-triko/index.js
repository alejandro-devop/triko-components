import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import PreImage from 'shared/components/base/pre-image';
import Text from 'components/base/text';
import defaultAvatar from 'assets/avatars/profile-photo.jpg';
import RatingStars from 'components/base/rating-stars';
import styles from './styles';

/**
 * This component renders the triko information for the request card
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param triko
 * @returns {*}
 * @constructor
 */
const InfoTriko = ({triko = {}}) => {
  const [classes] = useStyles(styles);
  const {
    user: {photo_url},
    pi: {first_name: firstName, last_name: lastName},
    rating,
  } = triko;
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
        <View style={classes.ratingWrapper}>
          <Text style={classes.ratingText}>{`${rating}.0`}</Text>
        </View>
        <RatingStars readOnly value={rating} size={10} />
      </View>
    </View>
  );
};

InfoTriko.propTypes = {
  triko: PropTypes.shape({
    user: PropTypes.shape({
      photo_url: PropTypes.string,
    }),
    pi: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default InfoTriko;

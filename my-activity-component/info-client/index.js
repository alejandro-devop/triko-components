import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import PreImage from 'shared/components/base/pre-image';
import Text from 'components/base/text';
import defaultAvatar from 'assets/avatars/profile-photo.jpg';
import styles from './styles';
import RatingStars from 'components/base/rating-stars';
import classNames from 'shared/utils/classnames';

/**
 * This component renders the client information for the request card
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param client
 * @returns {*}
 * @constructor
 */
const ClientInfo = ({client = {}, isTriko, isFavor}) => {
  const [classes] = useStyles(styles);
  const {
    user: {photo_url},
    pi: {first_name: firstName, last_name: lastName},
    rating = 5,
  } = client;
  return (
    <View style={classNames({root: true, rootFavor: isFavor}, classes)}>
      <View
        style={classNames(
          {avatarWrapper: true, avatarWrapperFavor: isFavor},
          classes,
        )}>
        <PreImage
          source={photo_url ? {uri: photo_url} : defaultAvatar}
          style={classNames({avatar: true, avatarFavor: isFavor}, classes)}
        />
      </View>
      <View
        style={classNames(
          {infoWrapper: true, infoWrapperFavor: isFavor},
          classes,
        )}>
        <Text style={classes.fullName}>{`${firstName} ${lastName[0]}.`}</Text>
        <View
          style={classNames(
            {ratingWrapper: true, ratingWrapperFavor: isFavor},
            classes,
          )}>
          {!isTriko && <Text style={classes.rating}>{`${rating}.0`}</Text>}
          <RatingStars size={10} value={rating} />
          {isFavor && (
            <View style={classes.rateWrapper}>
              <Text style={classes.ratingText}>{`${rating}.0`}</Text>
            </View>
          )}
        </View>
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

import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
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
 * @param alternative
 * @param client
 * @param isPaid
 * @param isTriko
 * @param isFavor
 * @returns {*}
 * @constructor
 */
const ClientInfo = ({alternative, client = {}, isPaid, isTriko, isFavor}) => {
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
        <Text
          style={classNames(
            {fullName: true, fullNamePaid: isPaid, fullNameAlt: alternative},
            classes,
          )}>{`${firstName} ${lastName[0]}.`}</Text>
        {isTriko && (
          <View style={classes.ratingWrapperClient}>
            <Text style={classes.ratingTextClient}>{`${rating}.0`}</Text>
          </View>
        )}
        <View
          style={classNames(
            {ratingWrapper: true, ratingWrapperFavor: isFavor},
            classes,
          )}>
          {!isTriko && <Text style={classes.rating}>{`${rating}.0`}</Text>}
          <RatingStars size={10} value={rating} />
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

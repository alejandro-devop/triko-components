import useStyles from 'shared/hooks/use-styles';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import PreImage from 'shared/components/base/pre-image';
import avatar from 'assets/avatars/profile-photo.jpg';
import RatingStars from 'components/base/rating-stars';
import React from 'react';
import styles from './styles';

const TypeRequest = ({post = {}}) => {
  const {description, request = {}} = post;
  const {
    triko: {user = {}},
    rating = 1,
    details = [],
  } = request;
  const {photo_url: photoUrl} = user;
  const service = details[0].service;
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <Text style={classes.text}>{description}</Text>
      <View style={classes.serviceWrapper}>
        <View style={classes.avatarWrapper}>
          <PreImage
            style={classes.avatar}
            source={photoUrl ? {uri: photoUrl} : avatar}
          />
        </View>
        <View style={classes.serviceIconWrapper}>
          <PreImage
            style={classes.serviceIcon}
            source={{uri: service.icon || service.type.icon}}
          />
        </View>
        <RatingStars size={14} value={rating} />
      </View>
    </View>
  );
};

export default TypeRequest;

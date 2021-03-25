import useStyles from 'shared/hooks/use-styles';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import PreImage from 'shared/components/base/pre-image';
import avatar from 'assets/avatars/profile-photo.jpg';
import RatingStars from 'components/base/rating-stars';
import React from 'react';
import styles from './styles';
import {isEmpty} from 'shared/utils/functions';

const TypeRequest = ({post = {}, onView, isTriko}) => {
  const {content, request = {}} = post;
  const {attrs = {}, triko: trikos = [], details = [], client = {}} = request;
  const [triko = {}] = trikos;
  const [classes] = useStyles(styles);
  const {rating: requestRating} = attrs;
  const requestRatingVal = parseInt(
    isTriko ? requestRating.client : requestRating.triko,
  );
  const [firstDetail = {}] = details || [];
  const {service = {}} = firstDetail;
  const serviceIcon = !isEmpty(service.icon) ? service.icon : service.type.icon;
  const {user = {}} = isTriko ? client : triko;
  const {photo: photoUrl} = user;
  return (
    <TouchableOpacity onPress={onView} style={classes.root}>
      <View style={classes.content}>
        <Text style={classes.text}>{content}</Text>
      </View>
      <View style={classes.serviceWrapper}>
        <View style={classes.avatarWrapper}>
          <PreImage
            style={classes.avatar}
            source={photoUrl ? {uri: photoUrl} : avatar}
          />
        </View>
        <View style={classes.serviceIconWrapper}>
          <PreImage style={classes.serviceIcon} source={{uri: serviceIcon}} />
        </View>
        <RatingStars size={20} value={requestRatingVal} readOnly />
      </View>
    </TouchableOpacity>
  );
};

export default TypeRequest;

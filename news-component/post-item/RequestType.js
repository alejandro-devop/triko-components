import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import avatar from 'assets/avatars/profile-photo.jpg';
import useNavigate from 'shared/hooks/use-navigate';
import PreImage from 'shared/components/base/pre-image';
import palette from 'themes/styles/palette';
import RatingStars from 'components/base/rating-stars';

const RequestType = ({post = {}}) => {
  const {description, request = {}} = post;
  const {
    triko: {user = {}},
    rating = 1,
    details = [],
  } = request;
  const {photo_url: photoUrl} = user;
  const service = details[0].service;
  console.log('detail :', service);
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

const styles = () => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarWrapper: {
    width: 30,
    height: 30,
  },
  serviceWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIcon: {
    width: '100%',
    height: '100%',
  },
  serviceIconWrapper: {
    backgroundColor: palette.blueLighter,
    marginLeft: 5,
    borderRadius: 100,
    width: 45,
    height: 45,
  },
  actionsWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  root: {},
  text: {fontSize: 14},
});

export default RequestType;

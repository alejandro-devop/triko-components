import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import avatar from 'assets/avatars/profile-photo.jpg';
import PreImage from 'shared/components/base/pre-image';
import Text from 'shared/components/base/text';
import {isEmpty} from 'shared/utils/functions';
import RatingStars from 'components/base/rating-stars';
import useNavigate from 'shared/hooks/use-navigate';

const RequestInfo = ({post = {}, isTriko}) => {
  const {request = {}} = post;
  const {attrs = {}, client = {}, details = [], triko: trikos = []} = request;
  const [triko = {}] = trikos;
  const [detail = {}] = details;
  const {service = {}} = detail;
  const [classes] = useStyles(styles);
  const {user = {}, pi = {}} = isTriko ? client : triko;
  const {firstName, lastName} = pi;
  const {photo} = user;
  const {rating = {}} = attrs;
  const {client: ratingClient, triko: ratingTriko} = rating;
  const {navigation} = useNavigate();

  const handleViewProfile = () => {
    if (isTriko) {
    } else {
      navigation.navigate('triko-profile-public', {
        triko,
        hideHireButton: true,
      });
    }
  };
  return (
    <View style={classes.root}>
      <View style={classes.userInfoWrapper}>
        <View style={classes.avatarWrapper}>
          <PreImage
            style={classes.avatar}
            source={!isEmpty(photo) ? {uri: photo} : avatar}
          />
        </View>
        <View style={classes.serviceIconWrapper}>
          <PreImage
            style={classes.serviceIcon}
            source={{uri: service.icon || service.type.icon}}
          />
        </View>
        <View style={classes.infoWrapper}>
          <TouchableOpacity onPress={handleViewProfile}>
            <Text style={classes.name}>{`${firstName} ${lastName}`}</Text>
          </TouchableOpacity>
          <RatingStars
            readOnly
            size={16}
            value={isTriko ? ratingTriko : ratingClient}
          />
        </View>
      </View>
    </View>
  );
};

export default RequestInfo;

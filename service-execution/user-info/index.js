import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import avatar from 'assets/avatars/profile-photo.jpg';
import PreImage from 'shared/components/base/pre-image';
import Text from 'shared/components/base/text';
import RatingStars from 'components/base/rating-stars';
import {isEmpty} from 'shared/utils/functions';

const UserInfo = ({request = {}, isTriko}) => {
  const [classes] = useStyles(styles);
  const {client = {}, triko: trikos = []} = request;
  const [triko = {}] = trikos;
  const {user = {}, pi = {}, rate = 5} = isTriko ? client : triko;
  const {photo_url: photo} = user;
  const {first_name: firstName, last_name: lastName} = pi;
  const fullName =
    !isEmpty(firstName) && !isEmpty(lastName)
      ? `${firstName} ${lastName[0]}.`
      : '';
  return (
    <View style={classes.root}>
      <View style={classes.avatarWrapper}>
        <PreImage
          style={classes.avatar}
          source={photo ? {uri: photo} : avatar}
        />
      </View>
      <View style={classes.content}>
        <Text style={[classes.text, classes.fullName]}>{fullName}</Text>
        <View style={classes.rateWrapper}>
          <Text style={[classes.text, classes.rateText]}>{rate}</Text>
        </View>
        <RatingStars value={rate} readOnly size={9} />
      </View>
    </View>
  );
};

export default UserInfo;

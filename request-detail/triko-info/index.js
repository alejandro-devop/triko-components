import React from 'react';
import {View} from 'react-native';
import PreImage from 'shared/components/base/pre-image';
import Text from 'components/base/text';
import avatar from 'assets/avatars/profile-photo.jpg';
import useStyles from 'shared/hooks/use-styles';
import RatingStars from 'components/base/rating-stars';
import styles from './styles';

const TrikoInfo = ({triko = {}}) => {
  const {
    user: {photo_url: photoUrl},
    pi: {first_name: firstName, last_name: lastName},
    rating = 5,
  } = triko;
  const [classes] = useStyles(styles);
  const fullName = `${firstName} ${lastName.substring(0, 1)}.`;
  return (
    <View style={classes.root}>
      <View style={classes.avatarWrapper}>
        <PreImage
          style={classes.avatar}
          source={photoUrl ? {url: photoUrl} : avatar}
        />
      </View>
      <View style={classes.infoWrapper}>
        <Text style={[classes.text]}>{fullName}</Text>
        <View style={classes.rateWrapper}>
          <Text
            style={[classes.text, classes.textRating]}>{`${rating}.0`}</Text>
        </View>
        <RatingStars readOnly value={rating} size={10} />
      </View>
    </View>
  );
};

export default TrikoInfo;

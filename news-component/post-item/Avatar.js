import React from 'react';
import {View} from 'react-native';
import PreImage from 'shared/components/base/pre-image';
import AvatarImage from 'assets/avatars/profile-photo.jpg';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import classNames from 'shared/utils/classnames';
import {getElapsedTime} from 'shared/utils/functions';

const Avatar = ({author = {}, date, isRecommendation}) => {
  const {user = {}, pi = {}} = author;
  const {photo_url: photoUrl} = user;
  const {first_name: firstName, last_name: lastName} = pi;
  const fullName = `${firstName} ${lastName ? lastName.substring(0, 1) : ''}`;
  const [classes] = useStyles(styles);
  const elapsed = date ? getElapsedTime(date).split(' ')[0] : 0;
  return (
    <View style={classes.root}>
      <View style={classes.imageWrapper}>
        <PreImage
          source={photoUrl ? {uri: photoUrl} : AvatarImage}
          style={classes.image}
        />
      </View>
      <View style={classes.heading}>
        <Text
          style={classNames(
            {text: true, textWhite: isRecommendation},
            classes,
          )}>
          {fullName}
        </Text>
        {date && (
          <Text
            style={classNames(
              {text: true, textTime: true, textWhite: isRecommendation},
              classes,
            )}>
            {elapsed}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = ({palette}) => ({
  text: {
    color: palette.blue,
    fontSize: 16,
    fontWeight: '600',
  },
  textTime: {
    fontSize: 12,
  },
  textWhite: {
    color: '#FFF',
  },
  heading: {
    justifyContent: 'center',
  },
  image: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  fullNameWrapper: {},
  root: {
    flexDirection: 'row',
  },
});

export default Avatar;

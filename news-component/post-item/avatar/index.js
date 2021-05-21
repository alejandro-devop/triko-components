import {useStyles} from '@triko-app/hooks';
import {getElapsedTime} from 'shared/utils/functions';
import {View} from 'react-native';
import PreImage from 'shared/components/base/pre-image';
import AvatarImage from 'assets/avatars/profile-photo.jpg';
import Text from 'shared/components/base/text';
import classNames from 'shared/utils/classnames';
import React from 'react';
import styles from './styles';

const Avatar = ({author = {}, date, isRecommendation, title}) => {
  const {user = {}, pi = {}} = author;
  const {photo} = user;
  const {firstName, lastName} = pi;
  const fullName = `${firstName} ${lastName ? lastName.substring(0, 1) : ''}`;
  const [classes] = useStyles(styles);
  const elapsed = date ? getElapsedTime(date).split(' ')[0] : 0;
  return (
    <View style={classes.root}>
      <View style={classes.imageWrapper}>
        <PreImage
          source={photo ? {uri: photo} : AvatarImage}
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
        <Text style={classNames({text: true, textTitle: true}, classes)}>
          {title}
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

export default Avatar;

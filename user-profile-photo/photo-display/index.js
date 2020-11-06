import React from 'react';
import {View} from 'react-native';
import classNames from 'shared/utils/classnames';
import PreImage from 'shared/components/base/pre-image';
import profilePhoto from 'assets/avatars/profile-photo.jpg';
import CircleButton from 'components/base/buttons/circle-button';
import RatingStars from 'components/base/rating-stars';
import Text from 'shared/components/base/text';
import {useSession, useStyles} from 'hooks/index';
import styles from './styles';

const PhotoDisplay = ({hideRate, isTriko, onlyView, toggleUpdate, size}) => {
  const [classes] = useStyles(styles);
  const {
    stack: {user = {}, client = {}, triko = {}},
  } = useSession();
  const pi = isTriko ? triko.pi : client.pi;
  const {photo_url} = user;
  const {first_name: firstName, last_name: lastName} = pi;
  return (
    <View style={classes.root}>
      <View
        style={classNames(
          {
            imageWrapper: true,
            wrapperLg: size === 'lg',
            wrapperXl: size === 'xl',
          },
          classes,
        )}>
        <PreImage
          source={photo_url ? {uri: photo_url} : profilePhoto}
          style={classNames({image: true, imageLg: size === 'lg'}, classes)}
        />
        {!onlyView && (
          <CircleButton
            name="pen"
            size="sm"
            primary
            styles={{root: classes.button}}
            onPress={toggleUpdate}
          />
        )}
      </View>
      {!onlyView && (
        <>
          {!hideRate && <RatingStars size={12} value={5} />}
          <View style={classes.nameWrapper}>
            <Text style={classes.nameText}>{`${firstName} ${lastName}`}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default PhotoDisplay;

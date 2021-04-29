import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import classNames from 'shared/utils/classnames';
import PreImage from 'shared/components/base/pre-image';
import profilePhoto from 'assets/avatars/profile-photo.jpg';
import CircleButton from 'components/base/buttons/circle-button';
import RatingStars from 'components/base/rating-stars';
import Text from 'shared/components/base/text';
import {useSession, useStyles} from 'hooks/index';
import styles from './styles';

/**
 * This component renders the user profile photo
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param disableEdit
 * @param hideRate
 * @param isTriko
 * @param onlyView
 * @param toggleUpdate
 * @param size
 * @returns {*}
 * @constructor
 */
const PhotoDisplay = ({
  disableEdit,
  hideRate,
  isTriko,
  onlyView,
  toggleUpdate,
  size,
}) => {
  const [classes] = useStyles(styles);
  const {
    stack: {user = {}, client = {}, triko = {}},
  } = useSession();
  const pi = isTriko ? triko.pi : client.pi;
  const {photo_url} = user;
  const {first_name: firstName, last_name: lastName} = pi || {};
  return (
    <View style={classNames({root: true, rootTriko: isTriko}, classes)}>
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
        {!onlyView && !disableEdit && (
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
          {!hideRate && <RatingStars readOnly size={12} value={5} />}
          <View style={classes.nameWrapper}>
            <Text
              style={classNames(
                {nameText: true, nameTextTriko: isTriko},
                classes,
              )}>{`${firstName} ${lastName}`}</Text>
          </View>
        </>
      )}
    </View>
  );
};

PhotoDisplay.propTypes = {
  disableEdit: PropTypes.bool,
  hideRate: PropTypes.bool,
  isTriko: PropTypes.bool,
  onlyView: PropTypes.bool,
  toggleUpdate: PropTypes.func,
  size: PropTypes.string,
};

export default PhotoDisplay;

import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import PreImage from 'shared/components/base/pre-image';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import styles from './styles';

/**
 * This component renders the icon for the request card.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param otherClasses
 * @param image
 * @param primary
 * @param secondary
 * @param maxChars
 * @returns {*}
 * @constructor
 */
const CardIcon = ({
  classes: otherClasses = {},
  image,
  primary,
  secondary,
  maxChars = 16,
}) => {
  const [classes] = useStyles(styles);
  const stringToDisplay =
    primary.length > maxChars
      ? `${primary.substring(0, maxChars)}...`
      : primary;
  return (
    <View style={[classes.root, otherClasses.root]}>
      <View style={[classes.imageWrapper, otherClasses.imageWrapper]}>
        <PreImage style={[classes.image, otherClasses.image]} source={image} />
      </View>
      <View style={[classes.textWrapper, otherClasses.textWrapper]}>
        {primary && (
          <Text style={[classes.primary, otherClasses.primary]}>
            {stringToDisplay}
          </Text>
        )}
        {secondary && (
          <Text style={[classes.secondary, otherClasses.secondary]}>
            {secondary}
          </Text>
        )}
      </View>
    </View>
  );
};

CardIcon.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  maxChars: PropTypes.number,
};

export default CardIcon;

import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import PreImage from 'shared/components/base/pre-image';
import {useStyles} from '@triko-app/hooks';
import Text from 'components/base/text';
import styles from './styles';
import classNames from 'shared/utils/classnames';
import {acceptedStatuses} from 'shared/hooks/use-request-status';

/**
 * This component renders the icon for the request card.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param otherClasses
 * @param image
 * @param primary
 * @param secondary
 * @param maxChars
 * @param isTriko
 * @param alternative
 * @param isPaid
 * @returns {*}
 * @constructor
 */
const CardIcon = ({
  classes: otherClasses = {},
  image,
  primary,
  secondary,
  isTriko,
  maxChars = 16,
  isPaid,
  alternative,
}) => {
  const [classes] = useStyles(styles);
  const stringToDisplay =
    primary.length > maxChars
      ? `${primary.substring(0, maxChars)}...`
      : primary;
  return (
    <View style={[classNames({root: true}, classes), otherClasses.root]}>
      {!isTriko && (
        <View
          style={[
            classNames(
              {imageWrapper: true, imageWrapperTriko: isTriko},
              classes,
            ),
            otherClasses.imageWrapper,
          ]}>
          <PreImage
            style={[classes.image, otherClasses.image]}
            source={image}
          />
        </View>
      )}
      <View style={[classes.textWrapper, otherClasses.textWrapper]}>
        {primary && (
          <Text
            style={[
              classNames(
                {
                  primary: true,
                  primaryPaid: isPaid,
                  textAlternative: alternative,
                  textBold: isTriko,
                },
                classes,
              ),
              otherClasses.primary,
            ]}>
            {isTriko ? primary : stringToDisplay}
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
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({uri: PropTypes.string}),
  ]),
  primary: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  secondary: PropTypes.bool,
  isTriko: PropTypes.bool,
  maxChars: PropTypes.number,
};

export default CardIcon;

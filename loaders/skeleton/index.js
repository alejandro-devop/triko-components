import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import {View} from 'react-native';
import classNames from 'utils/classnames';
import Text from 'components/base/text';
import useStyles from 'hooks/useStyles';
import {ActivityIndicator} from 'react-native';
export const BAR_TYPE = 'bar';
export const CIRCLE_TYPE = 'circle';
export const SQUARE_TYPE = 'square';

/**
 * This component allows to create a simple loader.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0
 */
const SkeletonLoader = ({
  size = 'md',
  type = 'bar',
  style,
  withLoader,
  loaderPlaceholder,
}) => {
  const [classes] = useStyles(styles);
  const isBar = type === 'bar';
  const isCircle = type === 'circle';
  const isSquare = type === 'square';
  const isXs = size === 'xs';
  const isSm = size === 'sm';
  const isMd = size === 'md';
  const isLg = size === 'lg';
  const isXL = size === 'xl';

  return (
    <View style={[classes.wrapper, style]}>
      <View
        style={[
          classNames(
            {
              root: true,
              bar: isBar,
              barXs: isBar && isXs,
              barSm: isBar && isSm,
              barMd: isBar && isMd,
              barLg: isBar && isLg,
              barXl: isBar && isXL,
              circleXs: isCircle && isXs,
              circleSm: isCircle && isSm,
              circleMd: isCircle && isMd,
              circleLg: isCircle && isLg,
              squareXs: isSquare && isXs,
              squareSm: isSquare && isSm,
              squareMd: isSquare && isMd,
              squareLg: isSquare && isLg,
              circle: isCircle,
              square: isSquare,
            },
            [classes],
          ),
          style,
        ]}>
        {withLoader && (
          <View style={classes.loaderIndicator}>
            {loaderPlaceholder && (
              <Text style={classes.loaderPlaceholder} variant="caption">
                {`${loaderPlaceholder}...`}
              </Text>
            )}
            <ActivityIndicator size="small" style={classes.loader} />
          </View>
        )}
      </View>
    </View>
  );
};

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(['bar', 'square', 'circle']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xs', 'xl']),
};

export default SkeletonLoader;

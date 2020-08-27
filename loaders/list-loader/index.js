import React from 'react';
import PropTypes from 'prop-types';
import SkeletonLoader from 'shared/components/loaders/skeleton';
import classNames from 'shared/utils/classnames';
import {View} from 'react-native';
import _ from 'lodash';
import useStyles from 'shared/hooks/use-styles';

/**
 * This component allows to generate a list item loader
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const ListLoader = ({figure = 'circle', lines = 6, size = 'sm'}) => {
  const [classes] = useStyles(styles);
  return _.times(lines, index => (
    <View key={`text-line-${index}`} style={classes.root}>
      <View
        style={classNames(
          {
            squareWrapper: true,
            xs: size === 'xs',
          },
          [classes],
        )}>
        <SkeletonLoader type={figure} size={size} />
      </View>
      <View style={classes.barWrapper}>
        <SkeletonLoader size={size} />
      </View>
    </View>
  ));
};

ListLoader.propTypes = {
  lines: PropTypes.number,
};

const styles = {
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  squareWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xs: {
    flex: 1,
  },
  barWrapper: {
    flex: 9,
  },
};

export default ListLoader;

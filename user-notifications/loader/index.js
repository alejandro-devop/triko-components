import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import SkeletonLoader from 'shared/components/loaders/skeleton';
import _ from 'lodash';

/**
 * This component renders the notifications loader
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param lines
 * @returns {*}
 * @constructor
 */
const Loader = ({lines = 3}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {_.times(lines, (key) => (
        <View key={`loader-lines-${key}`} style={classes.cardWrapper}>
          <SkeletonLoader style={classes.avatar} />
          <View style={classes.textWrapper}>
            <SkeletonLoader style={[classes.text, classes.title]} />
            <SkeletonLoader style={[classes.text, classes.time]} />
            <SkeletonLoader style={[classes.text, classes.title]} />
          </View>
        </View>
      ))}
    </View>
  );
};

Loader.propTypes = {
  lines: PropTypes.number,
};

export default Loader;

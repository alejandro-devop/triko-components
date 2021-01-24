import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import {SkeletonLoader} from 'components/base/loaders';
import _ from 'lodash';

/**
 * Renders a loader for commentaries
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param times
 * @returns {*}
 * @constructor
 */
const PostCommentsLoader = ({times}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {_.times(times, (key) => (
        <View key={`loader-${key}`} style={classes.itemWrapper}>
          <View style={classes.content}>
            <SkeletonLoader type="circle" style={classes.avatar} />
            <View style={classes.textWrapper}>
              <SkeletonLoader style={classes.text} />
              <SkeletonLoader style={classes.text} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

PostCommentsLoader.propTypes = {
  times: PropTypes.number,
};

PostCommentsLoader.defaultProps = {
  times: 5,
};

export default PostCommentsLoader;

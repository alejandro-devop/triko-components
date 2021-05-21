import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import SkeletonLoader from 'shared/components/loaders/skeleton';
import _ from 'lodash';
import styles from './styles';

/**
 * This component renders the chat loader
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param times
 * @returns {*}
 * @constructor
 */
const Loader = ({times = 4}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {_.times(times, (index) => (
        <View style={classes.loaderCard} key={`chat-item-${index}`}>
          <View style={classes.avatarWrapper}>
            <SkeletonLoader type="circle" style={classes.avatar} />
          </View>
          <View style={classes.textWrapper}>
            <SkeletonLoader size="xs" style={classes.nameText} />
            <SkeletonLoader size="xs" style={classes.timeText} />
          </View>
          <View style={classes.countWrapper}>
            <View style={classes.count} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default Loader;

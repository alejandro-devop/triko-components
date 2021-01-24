import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import SkeletonLoader from 'shared/components/loaders/skeleton';

const PostLoader = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View>
        <SkeletonLoader style={classes.text} />
      </View>
      <SkeletonLoader style={classes.content} />
      <View style={classes.authorWrapper}>
        <SkeletonLoader type="circle" style={classes.avatar} />
        <View style={classes.avatarText}>
          <SkeletonLoader style={classes.textSmall} />
          <SkeletonLoader style={classes.textSmall} />
        </View>
      </View>
      <SkeletonLoader style={classes.divider} />
      <View style={classes.actions}>
        <SkeletonLoader type="circle" style={classes.button} />
        <SkeletonLoader type="circle" style={classes.button} />
      </View>
    </View>
  );
};

export default PostLoader;

import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import {SkeletonLoader} from 'components/base/loaders';

const LoaderItem = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.serviceWrapper}>
        <View style={classes.serviceIconWrapper}>
          <SkeletonLoader type="circle" style={[classes.serviceIcon]} />
          <SkeletonLoader size="xs" style={classes.line} />
        </View>
        <View style={classes.rateWrapper}>
          <SkeletonLoader size="xs" style={classes.line} />
          <SkeletonLoader size="xs" style={classes.line} />
        </View>
      </View>
      <View style={classes.trikoWrapper}>
        <SkeletonLoader size="xs" style={classes.line} />
        <SkeletonLoader size="xs" style={classes.line} />
        <View style={classes.avatarWrapper}>
          <SkeletonLoader type="circle" style={classes.avatar} />
          <View style={classes.textWrapper}>
            <SkeletonLoader size="xs" style={classes.line} />
            <SkeletonLoader size="xs" style={classes.line} />
            <SkeletonLoader size="xs" style={classes.line} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = ({palette}) => ({
  avatar: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  avatarWrapper: {
    marginTop: 30,
    flexDirection: 'row',
  },
  line: {
    height: 10,
  },
  rateWrapper: {
    width: 100,
    marginTop: 20,
  },
  root: {
    opacity: 0.4,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: palette.blueLightAccent,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  serviceIcon: {},
  serviceIconWrapper: {
    width: 120,
  },
  serviceWrapper: {
    flex: 3,
  },
  textWrapper: {
    flex: 1,
  },
  trikoWrapper: {
    flex: 4,
  },
});

export default LoaderItem;

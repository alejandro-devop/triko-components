import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import SkeletonLoader from 'shared/components/loaders/skeleton';
import _ from 'lodash';

const Loader = ({times = 4}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {_.times(times, key => (
        <View style={classes.loaderCard} key={`loader-post-key-${key}`}>
          <View style={classes.avatarWrapper}>
            <SkeletonLoader type="circle" />
          </View>
          <View style={classes.contentWrapper}>
            <View style={classes.nameWrapper}>
              <SkeletonLoader size="xs" style={classes.text} />
            </View>
            <SkeletonLoader size="xs" style={[classes.hour, classes.text]} />
            <SkeletonLoader size="xs" style={[classes.title, classes.text]} />
            <SkeletonLoader size="xs" style={[classes.text]} />
            <SkeletonLoader size="xs" style={[classes.text]} />
            <View style={classes.actionsWrapper}>
              <SkeletonLoader type="circle" style={classes.action} />
              <SkeletonLoader type="circle" style={classes.action} />
              <SkeletonLoader type="circle" style={classes.action} />
              <SkeletonLoader type="circle" style={classes.action} />
              <SkeletonLoader type="circle" style={classes.action} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};
const styles = ({palette}) => ({
  action: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  actionsWrapper: {
    marginTop: 10,
    flexDirection: 'row',
  },
  contentWrapper: {
    flex: 1,
  },
  hour: {
    width: 20,
  },
  loaderCard: {
    borderRadius: 30,
    opacity: 0.6,
    backgroundColor: palette.blueLightAccent,
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
  },
  nameWrapper: {
    width: '60%',
  },
  root: {
    flexGrow: 1,
  },
  text: {
    height: 10,
  },
  title: {
    width: '70%',
  },
});

export default Loader;

import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import SkeletonLoader from 'shared/components/loaders/skeleton';
import _ from 'lodash';

const Loader = ({times = 4}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {_.times(times, index => (
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

const styles = ({palette}) => ({
  avatar: {
    width: 70,
    height: 70,
  },
  avatarWrapper: {
    marginRight: 10,
  },
  count: {
    borderRadius: 100,
    width: 20,
    height: 20,
    backgroundColor: palette.blueLight,
  },
  countWrapper: {
    flexDirection: 'row',
    flex: 1,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  loaderCard: {
    backgroundColor: palette.blueLightAccent,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    opacity: 0.6,
  },
  nameText: {
    // width: 200,
  },
  root: {
  },
  textWrapper: {
    flex: 9,
  },
  timeText: {
    width: 50,
  },
});

export default Loader;

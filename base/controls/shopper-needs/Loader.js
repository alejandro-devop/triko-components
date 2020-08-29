import React from 'react';
import {View} from 'react-native';
import SkeletonLoader from 'shared/components/loaders/skeleton';
import useStyles from 'shared/hooks/use-styles';

/**
 * This component renders the loader for needs list
 * @author Jako <jakop.box@gmail.com>
 * @param classes
 * @returns {*}
 * @constructor
 */
const LoaderItem = ({classes = {}}) => (
  <View style={classes.itemWrapper}>
    <SkeletonLoader style={classes.item} />
    <SkeletonLoader style={classes.item} />
  </View>
);

const Loader = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <LoaderItem classes={classes} />
      <LoaderItem classes={classes} />
      <LoaderItem classes={classes} />
    </View>
  );
};

const styles = () => ({
  item: {
    flex: 1,
  },
  itemWrapper: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
  },
  root: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default Loader;

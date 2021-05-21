import React from 'react';
import {View} from 'react-native';
import ListLoader from 'components/base/loaders/ListLoader';
import Skeleton from 'components/base/loaders/skeleton';
import {useStyles} from '@triko-app/hooks';

const Loader = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.titleWrapper}>
        <Skeleton size="sm" />
      </View>
      <ListLoader />
    </View>
  );
};

const styles = {
  root: {
    paddingHorizontal: 20,
  },
  titleWrapper: {
    marginBottom: 20,
  },
};

export default Loader;

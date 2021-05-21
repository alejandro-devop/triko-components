import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import LoaderItem from './LoaderItem';

const Loader = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
    </View>
  );
};

const styles = () => ({
  root: {},
});

export default Loader;

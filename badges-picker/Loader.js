import React from 'react';
import {View} from 'react-native';
import Skeleton from 'components/base/loaders/skeleton';
import {useStyles} from '@triko-app/hooks';
import _ from 'lodash';

const Loader = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <Skeleton size="sm" />
      <View style={classes.badges}>
        {_.times(12, (key) => (
          <Skeleton key={`loader-badge-${key}`} type="circle" />
        ))}
      </View>
    </View>
  );
};

const styles = {
  root: {
    paddingVertical: 15,
  },
  badges: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};

export default Loader;

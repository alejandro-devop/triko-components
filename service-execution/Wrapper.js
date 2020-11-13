import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import useStyles from 'hooks/useStyles';

const Wrapper = ({children}) => {
  const [classes] = useStyles(styles);
  return <View style={classes.root}>{children}</View>;
};

const styles = ({palette}) => ({
  root: {
    flex: 1,
    // paddingBottom: 100,
    backgroundColor: palette.blueLight,
    zIndex: -1,
  },
});

export default Wrapper;

import React from 'react';
import {Platform, View} from 'react-native';
import Flag from 'react-native-flags';
import useStyles from 'shared/hooks/use-styles';

/**
 * This component renders a flag icon for the selected country
 * @param country
 * @returns {null|*}
 * @constructor
 */
const PrependControl = ({country}) => {
  const [classes] = useStyles(styles);
  if (!country) {
    return null;
  }
  return (
    <View style={classes.root}>
      <Flag
        code={country}
        size={Platform.select({ios: 32, android: 24})}
        type="flat"
      />
    </View>
  );
};

const styles = ({palette}) => ({
  root: {
    backgroundColor: palette.white,
    borderRadius: 100,
    width: 50,
    height: 50,
    padding: 4,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrependControl;

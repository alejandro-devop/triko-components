import React from 'react';
import {TouchableOpacity, Platform, View} from 'react-native';
import Text from 'shared/components/base/text';
import Flag from 'react-native-flags';
import {useStyles} from '@triko-app/hooks';

const CountryItem = ({name, country, onPress}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity style={classes.root} onPress={onPress}>
      <View style={classes.flagWrapper}>
        <Flag
          code={country}
          size={Platform.select({ios: 32, android: 24})}
          type="flat"
        />
      </View>
      <View style={classes.textWrapper}>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  flagWrapper: {
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
  },
  root: {
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: palette.grayLighter,
      },
      android: {
        borderBottomWidth: 1,
        borderBottomColor: palette.grayLighter,
      },
    }),
  },
});

export default CountryItem;

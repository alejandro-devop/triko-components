import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'components/base/text';
import Icon from 'components/base/icon';
import useStyles from 'shared/hooks/use-styles';

const SuggestionItem = ({item = {}, onPress}) => {
  const [classes] = useStyles(styles);
  const {primary, secondary} = item;
  return (
    <TouchableOpacity style={classes.root} onPress={onPress}>
      <View style={classes.content}>
        <Text style={classes.title}>{primary}</Text>
        {secondary && (
          <Text variant="caption" style={classes.caption}>
            {secondary}
          </Text>
        )}
      </View>
      <View style={classes.iconWrapper}>
        <Icon name="store-alt" style={classes.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  caption: {
    color: palette.blue,
  },
  content: {
    flex: 1,
  },
  icon: {
    color: palette.blue,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: palette.blueLighter,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    backgroundColor: palette.blueLight,
    marginBottom: 4,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingLeft: 25,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: palette.black,
  },
});

export default SuggestionItem;

import React from 'react';
import {TouchableOpacity} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import Icon from 'components/base/icon';

const SuggestionItem = ({label, onPress}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity style={classes.root} onPress={onPress}>
      <Text style={classes.text}>{label}</Text>
      <Icon name="map-marker" style={classes.icon} />
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  icon: {
    color: palette.blue,
  },
  root: {
    paddingHorizontal: 15,
    paddingRight: 20,
    backgroundColor: palette.blueLight,
    borderBottomColor: palette.blue,
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: palette.gray,
  },
});

export default SuggestionItem;

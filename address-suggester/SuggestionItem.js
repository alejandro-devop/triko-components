import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import Icon from 'components/base/icon';

const SuggestionItem = ({description, label, onPress}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity style={classes.root} onPress={onPress}>
      <View style={classes.textWrapper}>
        <Text style={classes.text}>{label}</Text>
        {description && (
          <Text style={[classes.text, classes.textDescription]}>{description}</Text>
        )}
      </View>
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
    fontSize: 15,
    color: palette.gray,
  },
  textDescription: {
    fontSize: 12,
  },
  textWrapper: {
    flex: 1,
  },
});

export default SuggestionItem;

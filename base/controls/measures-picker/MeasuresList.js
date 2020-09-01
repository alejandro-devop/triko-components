import React from 'react';
import {Platform, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import MeasureItem from './MeasureItem';

const MeasuresList = ({options = [], onSelect, selected = {}}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {options.map((item, key) => (
        <MeasureItem
          key={`measure-${key}`}
          label={item.name}
          selected={selected.id === item.id}
          onPress={() => onSelect(item)}
        />
      ))}
    </View>
  );
};

const styles = ({palette}) => ({
  root: {
    alignSelf: 'center',
    width: '98%',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderTopColor: 'transparent',
    borderColor: palette.grayLight,
    position: Platform.select({
      ios: 'absolute',
      android: 'relative',
    }),
    paddingTop: 25,
    paddingBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    top: Platform.select({
      ios: '75%',
      android: -15,
    }),
    zIndex: 99,
  },
});

export default MeasuresList;

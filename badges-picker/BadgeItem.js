import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from '@triko-app/hooks';
import Icon from 'components/base/icon';
import classNames from 'utils/classnames';
import ImageIcon from 'components/ImageIcon';

const BadgeItem = ({label, icon, onSelect, selected}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity onPress={onSelect} style={classes.root}>
      <ImageIcon
        imageClass={classes.icon}
        wrapperClass={classNames(
          {iconWrapper: true, iconWrapperSelected: selected},
          classes,
        )}
        source={{uri: icon}}
      />
      <Text style={classNames({label: true, labelSelected: selected}, classes)}>
        {label}
      </Text>
      {selected && (
        <View style={classes.selectedIconWrapper}>
          <Icon name="check-circle" style={classes.selectedIcon} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = ({palette, shadows}) => ({
  root: {
    alignItems: 'center',
    width: 80,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  iconWrapper: {
    width: 40,
    height: 40,
  },
  iconWrapperSelected: {
    width: 45,
    height: 45,
    padding: 4,
    backgroundColor: '#FFF',
    ...shadows.shadow3,
    shadowColor: palette.blue,
    borderRadius: 100,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  labelSelected: {
    color: palette.blue,
    fontWeight: '400',
  },
  selectedIconWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 4,
    borderRadius: 100,
    transform: [{translateY: -20}, {translateX: 10}],
  },
  selectedIcon: {
    fontSize: 26,
    color: palette.blue,
  },
});

export default BadgeItem;

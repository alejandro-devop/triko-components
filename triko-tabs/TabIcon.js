import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PreImage from 'components/pre-image';
import useStyles from 'hooks/useStyles';
import Text from 'components/base/text';
import classNames from 'utils/classnames';

const TabIcon = ({Component, icon, photo, label, onPress, selected}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity style={classes.root} onPress={onPress}>
      <View style={classNames({wrapper: true, selected}, classes)}>
        <>
          {icon && (
            <PreImage
              style={classes.icon}
              source={photo ? {uri: photo} : icon}
            />
          )}
          {Component && <Component />}
        </>
      </View>
      <Text style={classes.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  label: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '600',
  },
  root: {
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  wrapper: {
    padding: 10,
    borderRadius: 100,
  },
  selected: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 100,
  },
});

export default TabIcon;

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'components/base/icon';
import Text from 'components/base/text';
import PreImage from 'components/pre-image';
import {useStyles} from '@triko-app/hooks';

const Control = ({disabled, onPress, icon, label, photo}) => {
  const [classes] = useStyles(styles);
  const ComponentWrapper = disabled ? View : TouchableOpacity;
  if (disabled) {
    return null;
  }
  return (
    <ComponentWrapper
      onPress={() => (disabled ? null : onPress())}
      style={classes.root}>
      {label && (
        <View style={classes.labelWrapper}>
          <Text style={classes.label}>{label}</Text>
        </View>
      )}
      {!photo && (
        <View style={classes.buttonWrapper}>
          <View style={classes.button}>
            <Icon name={icon} style={classes.icon} />
          </View>
        </View>
      )}
      {photo && (
        <View style={classes.imageWrapper}>
          <PreImage source={{uri: photo}} style={classes.previewImage} />
        </View>
      )}
    </ComponentWrapper>
  );
};

const styles = ({palette}) => ({
  button: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.blue,
  },
  buttonWrapper: {
    flex: 2,
  },
  labelWrapper: {
    flex: 6,
  },
  icon: {
    color: '#FFF',
    fontSize: 40,
  },
  label: {
    color: palette.blue,
  },
  previewImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    zIndex: 10,
  },
});

export default Control;

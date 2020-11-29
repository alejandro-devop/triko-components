import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'components/base/icon';
import Text from 'components/base/text';
import PreImage from 'components/pre-image';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import {isEmpty} from 'shared/utils/functions';

const ButtonControl = ({
  disabled,
  onPress,
  icon = 'cloud-upload-alt',
  label,
  photo = {},
}) => {
  const [classes] = useStyles(styles);
  const ComponentWrapper = disabled ? View : TouchableOpacity;
  const photoUrl = !isEmpty(photo) ? photo.uri : null;
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
      {Boolean(photoUrl) && (
        <View style={classes.imageWrapper}>
          <PreImage source={{uri: photoUrl}} style={classes.previewImage} />
        </View>
      )}
    </ComponentWrapper>
  );
};

export default ButtonControl;

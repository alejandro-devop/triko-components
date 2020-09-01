import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';

const BorderedButton = ({disabled, icon = '', label, onPress, secondary}) => {
  const [classes] = useStyles(styles);
  const WrapperComponent = disabled ? View : TouchableOpacity;
  return (
    <View style={classes.root}>
      <WrapperComponent
        onPress={() => (!disabled ? onPress() : null)}
        style={classNames(
          {buttonWrapper: true, secondaryButton: secondary, disabled},
          classes,
        )}>
        <Icon
          name={icon}
          style={classNames(
            {icon: true, iconSecondary: secondary, iconDisabled: disabled},
            classes,
          )}
        />
      </WrapperComponent>
      {label && (
        <Text
          style={classNames(
            {label: true, labelSecondary: secondary, labelDisabled: disabled},
            classes,
          )}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = ({palette}) => ({
  buttonWrapper: {
    height: 70,
    width: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: palette.blue,
  },
  disabled: {
    borderColor: palette.gray,
    opacity: 0.3,
  },
  secondaryButton: {
    borderColor: palette.orange,
  },
  icon: {
    fontSize: 34,
    color: palette.blue,
  },
  iconDisabled: {
    color: palette.gray,
  },
  iconSecondary: {
    color: palette.orange,
  },
  label: {
    color: palette.blue,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },
  labelSecondary: {
    color: palette.orange,
  },
  labelDisabled: {
    color: palette.gray,
    opacity: 0.3
  },
  root: {
    width: 90,
    marginHorizontal: 15,
    alignItems: 'center',
  },
});

export default BorderedButton;

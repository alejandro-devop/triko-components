import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import styles from './styles';
import useStyles from 'shared/hooks/use-styles';
import Icon from 'shared/components/base/icon';
import classNames from 'shared/utils/classnames';

const RadioButton = ({disabled, label, onChange, placeholder, name, value}) => {
  const [classes, theme] = useStyles(styles);
  const selected = Boolean(value);
  const handleOnChange = () => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: !selected,
        },
      });
    }
  };
  const Wrapper = disabled ? View : TouchableOpacity;
  return (
    <View style={[classes.root, theme.row]}>
      {label && (
        <View style={classes.labelWrapper}>
          <Text style={classes.labelText}>{label}</Text>
        </View>
      )}
      <Wrapper
        onPress={() => (!disabled && handleOnChange ? handleOnChange() : null)}
        style={classes.controlWrapper}>
        <View
          style={classNames(
            {
              radioCircle: true,
              radioCircleDisabled: disabled,
            },
            classes,
          )}>
          {selected && (
            <Icon
              name="check"
              style={classNames({icon: true, iconDisabled: disabled}, classes)}
            />
          )}
        </View>
        <Text
          style={classNames(
            {
              placeholder: true,
              placeholderDisabled: disabled,
            },
            classes,
          )}>
          {placeholder}
        </Text>
      </Wrapper>
    </View>
  );
};

export default RadioButton;

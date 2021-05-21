import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import Icon from 'shared/components/base/icon';
import classNames from 'shared/utils/classnames';

const RadioButton = ({
  alternative,
  circle,
  checkedIcon = 'check',
  disabled,
  horizontal,
  label,
  onChange,
  placeholder,
  name,
  value,
  secondary,
  labelStyles,
  fromLeft,
}) => {
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
    <View
      style={[
        classNames(
          {root: true, horizontal, rootFromLeft: fromLeft, secondary},
          classes,
        ),
      ]}>
      {label && (
        <View
          style={[
            classNames(
              {labelWrapper: true, labelWrapperHorizontal: horizontal},
              classes,
            ),
          ]}>
          <Text
            style={[
              classNames(
                {labelText: true, labelTextHorizontal: horizontal},
                classes,
              ),
              labelStyles,
            ]}>
            {label}
          </Text>
        </View>
      )}
      <Wrapper
        onPress={() => (!disabled && handleOnChange ? handleOnChange() : null)}
        style={classes.controlWrapper}>
        <View
          style={classNames(
            {
              radioCircle: true,
              circleFill: circle && selected,
              circleFillSecondary: circle && selected && secondary,
              secondaryControl: secondary,
              radioCircleDisabled: disabled,
              radioCircleAlternative: alternative,
            },
            classes,
          )}>
          {selected && !circle && (
            <Icon
              name={checkedIcon}
              style={classNames(
                {
                  icon: true,
                  iconSecondary: secondary,
                  iconDisabled: disabled,
                  iconAlternative: alternative,
                },
                classes,
              )}
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

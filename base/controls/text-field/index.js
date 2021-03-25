import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Platform, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Label from 'shared/components/base/label';
import {
  autoCompleteInputTypes,
  keyboardTypes,
  autoCapitalizeTypes,
} from 'shared/utils/constants';
import Text from 'shared/components/base/text';
import classNames from 'shared/utils/classnames';
import handleChange from 'shared/components/base/commons/handle-change';
import useStyles from 'shared/hooks/use-styles';
import InputHelp from 'shared/components/base/controls/input-help';
import IconButton from 'shared/components/base/buttons/icon-button';
import useTranslation from 'shared/hooks/use-translate';
import palette from 'themes/styles/palette';

/**
 * This component allows to create a text field
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client, Triko
 * @param addOn
 * @param autoCompleteType
 * @param autoCorrect
 * @param autoFocus
 * @param keyboardType
 * @param classes
 * @param disabled
 * @param label
 * @param onKeyPress
 * @param onChange
 * @param onlyMask
 * @param onPress
 * @param placeholder
 * @param secondary
 * @param name
 * @param value
 * @param secureTextEntry
 * @returns {*}
 * @constructor
 */
const TextField = ({
  addOn,
  autoCapitalize = 'sentences',
  autoCompleteType,
  autoCorrect,
  autoFocus,
  classes: otherClasses = {},
  error,
  onlyMask,
  keyboardType,
  disabled,
  help,
  helpText,
  label,
  maxLength,
  name,
  onChange,
  onKeyPress,
  onFocus,
  onBlur,
  onPress,
  onSubmit,
  placeholder,
  prependControl,
  placeholderStyles,
  placeholderColor = '#FFF',
  preOn,
  primary,
  returnKeyType = 'done',
  required,
  secureTextEntry,
  secondary,
  style,
  value,
}) => {
  const [classes] = useStyles(styles);
  const [openHelp, setOpenHelp] = useState(false);
  const toggleHelp = () => setOpenHelp(!openHelp);
  const {_t} = useTranslation();
  const WrapperComponent = disabled ? View : TouchableOpacity;
  return (
    <>
      <View style={[classes.inputRoot, otherClasses.root]}>
        {label && (
          <Label
            disabled={disabled}
            required={required}
            secondary={secondary}
            style={classNames(
              {
                required: required && Boolean(error),
              },
              classes,
            )}>
            {label}
          </Label>
        )}
        <View style={classes.inputRow}>
          {prependControl}
          <WrapperComponent
            onPress={() => (!disabled && onPress ? onPress() : null)}
            style={classNames(
              {
                withError: Boolean(error) && !disabled,
                inputWrapper: true,
                inputPrimaryWrapper: primary,
                inputSecondaryWrapper: secondary,
                disabledInputWrapper: disabled,
              },
              classes,
            )}>
            {preOn && <View style={classes.preOn}>{preOn}</View>}
            {!onlyMask && (
              <TextInput
                onSubmitEditing={onSubmit}
                returnKeyType={returnKeyType}
                autoCapitalize={autoCapitalize}
                autoCompleteType={Platform.select({
                  ios: autoCompleteType,
                  android: null,
                })}
                autoCorrect={
                  Platform.OS === 'android' ? Boolean(autoCorrect) : autoCorrect
                }
                autoFocus={autoFocus}
                onBlur={onBlur}
                textContentType={'oneTimeCode'}
                onKeyPress={onKeyPress}
                keyboardType={keyboardType}
                editable={!disabled}
                maxLength={maxLength}
                onChangeText={(newValue) =>
                  handleChange(newValue, {name, onChange})
                }
                onFocus={onFocus}
                placeholder={_t(placeholder)}
                placeholderTextColor={
                  (primary || secondary) && !disabled
                    ? palette.blue3
                    : placeholderColor
                }
                secureTextEntry={secureTextEntry}
                style={[
                  classNames(
                    {
                      inputBase: true,
                      inputPrimary: primary,
                      inputSecondary: secondary,
                    },
                    [classes],
                  ),
                  style,
                ]}
                value={value}
              />
            )}
            {onlyMask && (
              <View
                style={classNames(
                  {mask: true, masKSecondary: secondary},
                  classes,
                )}>
                <Text
                  style={[
                    value ? classes.valueHolder : classes.placeholder,
                    placeholderStyles,
                    classNames(
                      {
                        primaryPh: primary,
                      },
                      classes,
                    ),
                  ]}>
                  {value || placeholder}
                </Text>
              </View>
            )}
            {addOn && <View style={classes.addOn}>{addOn}</View>}
          </WrapperComponent>
        </View>
        {error && typeof error === 'string' && (
          <View style={classes.errorWrapper}>
            <Text style={classes.errorText} variant="caption">
              {error}
            </Text>
          </View>
        )}
        {help && (
          <View style={classes.helpWrapper}>
            <Text variant="caption">{_t(help)}</Text>
            <IconButton name="question-circle" onPress={toggleHelp} />
          </View>
        )}
      </View>
      {help && (
        <InputHelp
          open={openHelp}
          onClose={toggleHelp}
          title={help}
          content={helpText}
        />
      )}
    </>
  );
};

TextField.propTypes = {
  addOn: PropTypes.node,
  autoCompleteType: PropTypes.oneOf(autoCompleteInputTypes),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sentences: PropTypes.oneOf(autoCapitalizeTypes),
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  editable: PropTypes.bool,
  keyboardType: PropTypes.oneOf(keyboardTypes),
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  preOn: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  primary: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onlyMask: PropTypes.bool,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  themeClasses: PropTypes.shape({
    disabledInputWrapper: PropTypes.object,
    inputBase: PropTypes.object,
    inputRoot: PropTypes.object,
    inputWrapper: PropTypes.object,
  }),
};

export default TextField;

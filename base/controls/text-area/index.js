import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Label from 'shared/components/base/label';
import {
  autoCompleteInputTypes,
  keyboardTypes,
  autoCapitalizeTypes,
} from 'shared/utils/constants';
import Text from 'shared/components/base/text';
import classNames from 'shared/utils/classnames';
import useStyles from 'shared/hooks/use-styles';
import palette from 'themes/styles/palette';
import useTranslation from 'hooks/useTranslation';

/**
 * This component allows to create a text field
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param addOn
 * @param autoCompleteType
 * @param autoCorrect
 * @param autoFocus
 * @param keyboardType
 * @param classes
 * @param disabled
 * @param label
 * @param onChange
 * @param onlyMask
 * @param onPress
 * @param placeholder
 * @param name
 * @param theme
 * @param value
 * @param secureTextEntry
 * @returns {*}
 * @constructor
 */
const TextArea = ({
  addOn,
  autoCapitalize = 'sentences',
  error,
  autoCompleteType,
  autoCorrect,
  autoFocus,
  onlyMask,
  keyboardType,
  disabled,
  label,
  name,
  onChange,
  onPress,
  placeholder,
  preOn,
  primary,
  secureTextEntry,
  value,
  maxChars,
  required,
  returnKeyType,
  onSubmitEditing,
  ..._props
}) => {
  const [classes] = useStyles(styles);
  const [textAreaValue, setTextAreaValue] = useState('');
  const {_t} = useTranslation();
  const handleChange = (newValue) => {
    if (maxChars && newValue.length > maxChars) {
      return false;
    }
    setTextAreaValue(newValue);
    if (onChange) {
      onChange({
        target: {
          name,
          value: newValue,
        },
      });
    }
  };
  const totalChars = textAreaValue.length;
  return (
    <View style={classes.inputRoot}>
      {label && (
        <Label
          style={classNames(
            {
              required: required && Boolean(error),
            },
            classes,
          )}>
          {`${required ? '* ' : ''}${label}`}
        </Label>
      )}
      <View style={classes.textAreaWrapper}>
        <TouchableOpacity
          onPress={onPress}
          style={classNames(
            {
              inputWrapper: true,
              inputWrapperOverride: true,
              inputPrimaryWrapper: primary,
              disabledInputWrapper: disabled,
            },
            [classes],
          )}>
          {preOn && <View style={classes.preOn}>{preOn}</View>}
          {(totalChars > 0 || maxChars) && (
            <View style={classes.counterWrapper}>
              <Text style={classes.counter} variant="caption">
                {totalChars + (maxChars ? `/${maxChars}` : '')}
              </Text>
            </View>
          )}
          {!onlyMask && (
            <TextInput
              autoCapitalize={autoCapitalize}
              autoCompleteType={autoCompleteType}
              autoCorrect={autoCorrect}
              autoFocus={autoFocus}
              keyboardType={keyboardType}
              editable={!disabled}
              multiline
              returnKeyType={returnKeyType}
              onChangeText={handleChange}
              placeholder={_t(placeholder)}
              placeholderTextColor={primary ? palette.blue3 : palette.grayLight}
              secureTextEntry={secureTextEntry}
              onSubmitEditing={onSubmitEditing}
              style={classNames(
                {inputBase: true, textArea: true, inputPrimary: primary},
                [classes],
                classes.inputBase,
              )}
              value={textAreaValue}
              {..._props}
            />
          )}
          {onlyMask && (
            <Text style={value ? classes.valueHolder : classes.placeholder}>
              {value || placeholder}
            </Text>
          )}
          {addOn && <View style={classes.addOn}>{addOn}</View>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

TextArea.propTypes = {
  addOn: PropTypes.node,
  autoCompleteType: PropTypes.oneOf(autoCompleteInputTypes),
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

export default TextArea;

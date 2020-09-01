import React from 'react';
import TextField from 'components/base/controls/text-field';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import {isEmpty} from 'shared/utils/functions';

const InputControl = ({
  label,
  onPress,
  placeholder,
  primary,
  secondary,
  value = {},
}) => {
  const [classes] = useStyles(styles);
  const {name, category} = value || {};
  return (
    <>
      {label && <Text style={classes.label}>{label}</Text>}
      <TextField
        onlyMask
        placeholder={placeholder}
        primary={primary}
        secondary={secondary}
        onPress={onPress}
        value={!isEmpty(name) ? name + (category ? ` (${category})` : '') : ''}
      />
    </>
  );
};

const styles = ({palette}) => ({
  label: {
    color: palette.blue,
    fontWeight: '600',
  },
  icon: {
    marginRight: 20,
    color: palette.grayLight,
  },
});

export default InputControl;

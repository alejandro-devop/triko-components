import React from 'react';
import TextField from 'shared/components/base/controls/text-field';
import useStyles from 'shared/hooks/use-styles';

const Control = ({placeholder, primary, secondary}) => {
  const [classes] = useStyles(styles);
  return (
    <TextField
      onlyMask
      // placeholderStyles={}
      placeholder={placeholder}
      primary={primary}
      secondary={secondary}
    />
  );
};

const styles = () => ({
  placeholder: {},
});

export default Control;

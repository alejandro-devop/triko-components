import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import IconButton from 'shared/components/base/buttons/icon-button';
import {useStyles} from 'hooks/index';

const Button = () => {
  const [classes] = useStyles(styles);
  const total = 1;
  return (
    <View style={classes.root}>
      <View style={classes.caret}>
        <Text style={classes.caretText}>{total}</Text>
      </View>
      <IconButton name="bell" style={classes.icon} />
    </View>
  );
};

const styles = () => ({
  root: {},
});

export default Button;

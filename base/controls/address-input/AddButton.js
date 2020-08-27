import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import CircleButton from 'shared/components/base/buttons/circle-button';

const AddButton = ({onPress}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <CircleButton
        onPress={onPress}
        name="plus"
        primary
        label={'Add new address'}
      />
    </View>
  );
};

const styles = () => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AddButton;

import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';

const HourItem = ({blockWidth, blockHeight}) => {
  const [classes] = useStyles(styles);
  return (
    <View
      style={[
        classNames({}, classes),
        classes.root,
        {width: blockWidth, height: blockHeight},
      ]}>
      {null}
    </View>
  );
};

const styles = () => ({
  root: {
    backgroundColor: 'red',
  },
});

export default HourItem;

import React from 'react';
import {View} from 'react-native';
import useStyles from 'hooks/useStyles';
import PrettyIcon from 'shared/components/pretty-icon';

const NoRequestItems = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <PrettyIcon
        name="list-alt"
        classes={{
          root: classes.iconWrapper,
          icon: classes.icon,
        }}
      />
    </View>
  );
};

const styles = ({palette}) => ({
  icon: {
    color: palette.gray,
  },
  iconWrapper: {
    backgroundColor: palette.grayLighter,
    borderColor: palette.gray,
    borderWidth: 8,
    opacity: 0.4,
  },
  label: {
    marginTop: 20,
    fontSize: 24,
    color: palette.orange,
    fontWeight: '600',
  },
  root: {
    alignItems: 'center',
  },
});

export default NoRequestItems;

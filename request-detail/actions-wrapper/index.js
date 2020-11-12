import React from 'react';
import {View} from 'react-native';
import Slide from 'shared/components/anims/Slide';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';

const ActionsWrapper = ({children}) => {
  const [classes] = useStyles(styles);
  return (
    <Slide direction="bottom" style={classes.actionsWrapper} delay={1000}>
      <View style={classes.actionsRow}>{children}</View>
    </Slide>
  );
};

export default ActionsWrapper;

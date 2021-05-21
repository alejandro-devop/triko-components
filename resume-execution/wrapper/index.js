import React from 'react';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import Slide from 'shared/components/anims/Slide';

const Wrapper = ({children}) => {
  const [classes] = useStyles(styles);
  return (
    <Slide direction="left" style={classes.root}>
      {children}
    </Slide>
  );
};

export default Wrapper;

import React from 'react';
import {ScrollView} from 'react-native';
import {useStyles} from 'hooks';
import styles from './styles';

const ScrollContainer = ({children, ...otherProps}) => {
  const [classes] = useStyles(styles);
  return (
    <ScrollView
      contentContainerStyle={classes.content}
      style={classes.root}
      {...otherProps}>
      {children}
    </ScrollView>
  );
};

export default ScrollContainer;

import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const ComplaintsForm = () => {
  const classes = useStyles(styles);
  return <View style={classes.root}></View>;
};

export default ComplaintsForm;

import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import Actions from '../request-actions';

const ComponentWrapper = ({request = {}}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.content}>
        <View style={classes.tip}>{null}</View>
      </View>
      <Actions />
    </View>
  );
};

export default ComponentWrapper;

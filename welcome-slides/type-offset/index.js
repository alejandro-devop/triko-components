import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const TypeOffset = ({offsetSize = 20}) => {
  const [classes] = useStyles(styles);
  return <View style={[classes.root, {height: offsetSize}]} />;
};

export default TypeOffset;

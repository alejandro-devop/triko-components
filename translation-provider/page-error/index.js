import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Text from 'components/base/text';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PageError = ({
  icon = 'bug',
  message = 'Opps something goes wrong!',
  size = 150,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.iconWrapper}>
        <Icon name={icon} size={size} style={styles.icon} />
      </View>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default PageError;

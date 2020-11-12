import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import Icon from 'components/base/icon';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';

const InfoRow = ({label = '', value, icon}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <Text style={[classes.label, classes.text]}>{label}</Text>
      {value && <Text style={[classes.text, classes.value]}>{value}</Text>}
      {icon ? (
        <Icon name={icon} style={classes.icon} />
      ) : (
        <View style={classes.iconOffset} />
      )}
    </View>
  );
};

export default InfoRow;

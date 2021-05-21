import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import Icon from 'components/base/icon';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const InfoRow = ({description, label = '', subtitle, value, icon}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.contentWrapper}>
        <Text style={[classes.label, classes.text]}>{label}</Text>
        {Boolean(value) && (
          <Text style={[classes.text, classes.value]}>{value}</Text>
        )}
        {icon ? (
          <Icon name={icon} style={classes.icon} />
        ) : (
          <View style={classes.iconOffset} />
        )}
      </View>
      {description && (
        <View style={classes.descriptionWrapper}>
          {subtitle && (
            <Text style={classes.descriptionSubtitleText}>{subtitle}</Text>
          )}
          <Text style={classes.descriptionText}>{description}</Text>
        </View>
      )}
    </View>
  );
};

export default InfoRow;

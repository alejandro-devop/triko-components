import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import PreImage from 'shared/components/base/pre-image';
import Text from 'shared/components/base/text';
import {isEmpty} from 'shared/utils/functions';

const ServiceInfo = ({request = {}, maxChars = 20}) => {
  const [classes] = useStyles(styles);
  const {details = []} = request;
  const [service = {}] = details;
  const {
    icon,
    type = {},
    name,
  } = service && service.service ? service.service : {};
  const serviceName =
    !isEmpty(name) && name.length > maxChars
      ? name.substring(0, maxChars) + '...'
      : name;
  return (
    <View style={classes.root}>
      <View style={classes.iconWrapper}>
        <PreImage
          style={classes.icon}
          source={{uri: icon ? icon : type.icon}}
        />
        <Text style={classes.name}>{serviceName}</Text>
      </View>
    </View>
  );
};

export default ServiceInfo;

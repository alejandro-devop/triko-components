import React from 'react';
import {View} from 'react-native';
import {useSession, useStyles} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';
import styles from './styles';
import Icon from 'shared/components/base/icon';
import Text from 'shared/components/base/text';

const CurrentLocationValidator = ({children}) => {
  const {
    stack: {currentLocation},
  } = useSession();
  const [classes] = useStyles(styles);
  if (isEmpty(currentLocation)) {
    return (
      <View style={classes.root}>
        <View style={classes.iconWrapper}>
          <Icon name="map-marker" style={classes.icon} />
          <Icon name="ban" style={[classes.icon, classes.iconSecondary]} />
        </View>
        <View style={classes.textWrapper}>
          <Text style={classes.text}>cannot_find_your_current_location</Text>
        </View>
      </View>
    );
  }
  return children;
};

export default CurrentLocationValidator;

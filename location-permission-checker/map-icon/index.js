import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import PreImage from 'shared/components/base/pre-image';
import mapImage from 'shared/assets/icons/map-display.png';
import classNames from 'shared/utils/classnames';

const MapIcon = ({collapsed}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classNames({root: true, rootCollapsed: collapsed}, classes)}>
      <PreImage source={mapImage} style={classes.image} />
      {collapsed && <View style={classes.line} />}
    </View>
  );
};

export default MapIcon;

import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import ImageIcon from 'main/components/ImageIcon';
import Icon from 'components/base/icon';

/**
 * This component renders a building type item.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param item
 * @param selected
 * @returns {*}
 * @constructor
 */
const BuildingItem = ({item = {}, selected}) => {
  const [classes] = useStyles(styles);
  const {name, icon} = item;
  return (
    <View style={classes.root}>
      {selected && (
        <View style={classes.selectedIndicator}>
          <Icon name="check-circle" style={classes.selectedIcon} size={25} />
        </View>
      )}
      <View style={classes.iconWrapper}>
        <ImageIcon source={{uri: icon}} />
      </View>
      <View style={classes.textWrapper}>
        <Text style={classes.text}>{name}</Text>
      </View>
    </View>
  );
};

export default BuildingItem;

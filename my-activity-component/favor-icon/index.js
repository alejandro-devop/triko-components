import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import PreImage from 'shared/components/base/pre-image';
import Text from 'components/base/text';
import useTranslation from 'hooks/useTranslation';
import styles from './styles';

/**
 * This component renders the icon for the favor services.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param name
 * @param iconSource
 * @returns {*}
 * @constructor
 */
const FavorIcon = ({name, iconSource}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      <PreImage source={iconSource} style={classes.image} />
      <Text style={classes.text}>{_t(name)}</Text>
    </View>
  );
};

export default FavorIcon;

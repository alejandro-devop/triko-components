import React from 'react';
import {View} from 'react-native';
import PreImage from 'shared/components/base/pre-image';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const TypeImage = ({
  source,
  width = 100,
  height = 100,
  styles: customStyles = {},
}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <PreImage
        source={source}
        style={[classes.image, {width, height}, customStyles]}
      />
    </View>
  );
};

export default TypeImage;

import React from 'react';
import {View, Image} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const Index = ({source, wrapperClass, imageClass}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={[classes.root, wrapperClass]}>
      {source && <Image style={[classes.image, imageClass]} source={source} />}
    </View>
  );
};

export default Index;

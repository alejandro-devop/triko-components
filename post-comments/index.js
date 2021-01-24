import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import Loader from './loader';

const PostComments = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <Loader />
    </View>
  );
};

export default PostComments;

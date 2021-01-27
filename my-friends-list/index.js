import React from 'react';
import {ScrollView, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';

const MyFriendsList = () => {
  const [classes] = useStyles(styles);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={classes.root}>{null}</View>
    </ScrollView>
  );
};

export default MyFriendsList;

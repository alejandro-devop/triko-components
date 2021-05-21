import React from 'react';
import {ScrollView} from 'react-native';
import {useStyles} from '@triko-app/hooks';

const Scrollable = ({children}) => {
  const [classes] = useStyles(styles);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={classes.root}>
      {children}
    </ScrollView>
  );
};

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

export default Scrollable;

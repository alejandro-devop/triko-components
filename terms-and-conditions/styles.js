import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentStyles: {
    height: '95%',
    ...Platform.select({
      android: {
        maxHeight: '95%',
      },
    }),
  },
});

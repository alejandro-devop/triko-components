import {Platform} from 'react-native';

export default () => ({
  actionWrapper: {
    alignItems: 'center',
  },
  label: {
    fontSize: Platform.select({android: 20, ios: 22}),
  },
  root: {
    height: Platform.select({
      ios: 620,
      android: 600,
    }),
    maxHeight: '95%',
  },
});

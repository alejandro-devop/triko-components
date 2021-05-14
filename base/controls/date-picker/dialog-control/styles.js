import {Platform} from 'react-native';

export default () => ({
  actionWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: Platform.select({android: 17, ios: 22}),
  },
  root: {
    height: Platform.select({
      ios: 620,
      android: 600,
    }),
    maxHeight: '95%',
  },
});

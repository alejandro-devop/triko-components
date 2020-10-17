import {Platform} from 'react-native';

export default () => ({
  root: {
    minHeight: 100,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#FFF',
        shadowOffset: {
          width: 0,
          height: -20,
        },
        shadowOpacity: 0.8,
        shadowRadius: 16.0,
        elevation: 10,
      },
      android: {},
    }),
  },
  textWrapper: {
    flex: 1,
  },
});

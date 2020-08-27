import {Platform} from 'react-native';

export default ({palette}) => ({
  root: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        width: 40,
        height: 40,
      },
      android: {
        width: 25,
        height: 25,
      },
    }),
  },
  icon: {
    color: palette.gray,
  },
  disabled: {
    opacity: 0.3,
  },
});

import {Platform} from 'react-native';
export default ({palette}) => ({
  icon: {
    marginLeft: 5,
  },
  root: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  text: {
    color: palette.white,
    fontSize: Platform.select({ios: 18, android: 14}),
  },
  disableUnderline: {
    textDecorationLine: 'none',
  },
  primary: {
    color: palette.blue,
  },
});

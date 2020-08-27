import {Platform} from 'react-native';
export default ({palette}) => ({
  root: {
    paddingVertical: 10,
  },
  text: {
    color: palette.white,
    fontSize: Platform.select({ios: 18, android: 14}),
  },
  primary: {
    color: palette.blue,
  },
});

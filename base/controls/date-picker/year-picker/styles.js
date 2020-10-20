import {Platform} from 'react-native';

export default ({palette}) => ({
  item: {
    paddingVertical: 5,
    alignItems: 'center',
    borderBottomColor: palette.grayLighter,
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 20,
      },
      android: {
        borderBottomWidth: 1,
      },
    }),
  },
  root: {
    height: 500,
    maxHeight: '90%',
    // minHeight: '60%',
    width: Platform.select({ios: 200, android: 200}),
  },
  selected: {
    backgroundColor: palette.blue,
  },
  selectedText: {
    color: '#FFF',
  },
});

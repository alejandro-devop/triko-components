import {Platform} from 'react-native';

export default ({palette}) => ({
  selected: {
    backgroundColor: palette.blue1,
  },
  iconWrapper: {
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.grayLighter,
    marginRight: 20,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    padding: 3,
    backgroundColor: '#FFF',
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        borderColor: 'transparent',
        borderRadius: 50,
        borderWidth: 1,
        borderBottomColor: palette.grayLighter,
      },
      android: {
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: palette.grayLighter,
      },
    }),
  },
  textWrapper: {
    flex: 1,
  },
});

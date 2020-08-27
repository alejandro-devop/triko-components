import {Platform} from 'react-native';

export default ({palette}) => ({
  root: {},
  icon: {
    color: palette.blue,
    marginLeft: 10,
  },
  iconPrimary: {
    color: '#FFF',
  },
  iconDisabled: {
    color: palette.gray,
    opacity: 0.6,
  },
  baseButton: {
    alignItems: 'center',
    borderColor: palette.blue,
    borderRadius: 40,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        paddingHorizontal: 25,
        paddingVertical: 4,
        marginHorizontal: 5,
        marginVertical: 5,
      },
      android: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        marginHorizontal: 5,
        marginVertical: 5,
      },
    }),
  },
  buttonText: {
    color: palette.blue,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: Platform.select({ios: 20}),
  },
  smButton: {
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  primary: {
    backgroundColor: palette.orange,
    borderColor: palette.orange,
  },
  textPrimary: {
    color: palette.white,
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: palette.blue,
    borderColor: palette.blue,
    borderWidth: 2,
  },
  textSecondary: {
    color: '#FFF',
  },
  disabled: {
    backgroundColor: palette.grayLighter,
    borderColor: palette.grayLight,
    opacity: 0.7,
  },
  textDisabled: {
    color: palette.gray,
  },
});

import {Platform} from 'react-native';

export default ({palette}) => ({
  helpWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: palette.gray,
    ...Platform.select({
      ios: {
        fontSize: Platform.select({ios: 16}),
      },
      android: {
        paddingHorizontal: 20,
      },
    }),
  },
  mask: {
    flex: 10,
    minHeight: 45,
    justifyContent: 'center',
  },
  valueHolder: {
    paddingHorizontal: 5,
    fontSize: Platform.select({ios: 16}),
  },
  preOn: {
    color: '#FFF',
  },
  errorWrapper: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  errorText: {
    color: palette.redDark,
  },
  inputRow: {
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  required: {
    color: 'red',
  },
  inputBase: {
    flex: 10,
    paddingHorizontal: 15,
    width: '100%',
    color: '#FFF',
    ...Platform.select({
      ios: {
        height: 40,
        fontSize: 18,
      },
      android: {
        fontSize: 14,
        padding: 0,
      },
    }),
  },
  inputPrimary: {
    color: palette.black,
    // color: palette.blue3,
  },
  inputWrapper: {
    flex: 1,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    opacity: 1,
    ...Platform.select({
      ios: {
        paddingHorizontal: 15,
        borderRadius: 15,
      },
      android: {
        paddingHorizontal: 5,
        height: 35,
        borderRadius: 10,
      },
    }),
  },
  withError: {
    borderWidth: 1,
    borderColor: palette.red,
  },
  inputPrimaryWrapper: {
    backgroundColor: palette.blue1,
    borderColor: palette.red,
    opacity: 1,
  },
  inputRoot: {
    width: '100%',
    marginTop: Platform.select({
      ios: 10,
      android: 5,
    }),
    paddingHorizontal: 0,
  },
  primaryPh: {
    color: palette.blue,
  },
  disabledInputWrapper: {
    backgroundColor: palette.grayLighter,
    // backgroundColor: 'red',
  },
});

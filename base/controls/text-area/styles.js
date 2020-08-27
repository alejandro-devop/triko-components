import {Platform} from 'react-native';

const inputSize = 140;
export default ({palette}) => ({
  counterWrapper: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    top: 10,
  },
  disabledInputWrapper: {
    backgroundColor: palette.grayLight,
    opacity: 0.4,
  },
  inputWrapper: {
    flex: 1,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: palette.grayLighter,
      },
      android: {
        paddingHorizontal: 5,
      },
    }),
  },
  inputPrimaryWrapper: {
    backgroundColor: palette.blue1,
  },
  inputBase: {
    flex: 10,
    paddingHorizontal: 15,
    width: '100%',
    color: palette.black,
    ...Platform.select({
      ios: {
        height: 45,
        fontSize: 18,
      },
      android: {
        height: 40,
        fontSize: 16,
      },
    }),
  },
  textAreaWrapper: {
    minHeight: inputSize,
  },
  inputWrapperOverride: {
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  placeholder: {
    flex: 10,
    paddingHorizontal: 20,
    color: palette.gray,
  },
  valueHolder: {
    flex: 10,
    paddingHorizontal: 20,
  },
  preOn: {
    color: '#FFF',
  },
  required: {
    color: 'red',
  },
});

export default ({palette}) => ({
  root: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  icon: {
    color: palette.blue,
  },
  iconDisabled: {
    color: palette.grayLight,
  },
  inputWrapper: {
    flex: 8,
  },
  input: {
    textAlign: 'center',
  },
  controlWrapper: {
    maxWidth: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    flex: 6,
  },
});

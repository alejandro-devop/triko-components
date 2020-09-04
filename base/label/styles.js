export default ({palette}) => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    color: palette.orange,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.8,
  },
  disabledText: {
    color: palette.grayLight,
  },
  secondary: {
    color: palette.blue,
    fontWeight: '600',
  },
});

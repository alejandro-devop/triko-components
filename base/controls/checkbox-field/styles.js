export default ({palette}) => ({
  icon: {
    color: palette.blue,
  },
  boxWrapper: {
    backgroundColor: palette.white,
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.grayLight,
  },
  disabled: {
    opacity: 0.8,
  },
  disabledBox: {
    backgroundColor: palette.grayLight,
  },
  label: {
    color: palette.orange,
  },
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

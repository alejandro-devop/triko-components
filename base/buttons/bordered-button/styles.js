export default ({palette}) => ({
  buttonWrapper: {
    height: 45,
    width: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: palette.blue,
  },
  buttonWrapperFilled: {
    backgroundColor: '#FFF',
  },
  disabled: {
    borderColor: palette.gray,
    opacity: 0.3,
  },
  secondaryButton: {
    borderColor: palette.orange,
  },
  icon: {
    fontSize: 26,
    color: palette.blue,
  },
  iconDisabled: {
    color: palette.gray,
  },
  iconSecondary: {
    color: palette.orange,
  },
  iconSuccess: {
    color: palette.green,
  },
  iconDanger: {
    color: palette.red,
  },
  iconWarning: {
    color: palette.orangeDark,
  },
  iconSm: {
    fontSize: 20,
  },
  label: {
    color: palette.blue,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
  },
  labelSecondary: {
    color: palette.orange,
  },
  labelDisabled: {
    color: palette.gray,
    opacity: 0.3,
  },
  labelWarning: {
    color: palette.orangeDark,
  },
  labelDanger: {
    color: palette.red,
  },
  root: {
    alignItems: 'center',
  },
  wrapperSuccess: {
    borderColor: palette.green,
  },
  wrapperDanger: {
    borderColor: palette.red,
  },
  wrapperWarning: {
    borderColor: palette.orangeDark,
  },
  wrapperSm: {
    width: 35,
    height: 35,
  },
});

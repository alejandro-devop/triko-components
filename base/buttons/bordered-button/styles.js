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
  label: {
    color: palette.blue,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
  },
  labelSecondary: {
    color: palette.orange,
  },
  labelDisabled: {
    color: palette.gray,
    opacity: 0.3,
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
});

export default ({palette}) => ({
  root: {
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  radioCircle: {
    marginRight: 10,
    borderRadius: 100,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: palette.blue,
  },
  radioCircleDisabled: {
    borderColor: palette.grayLight,
  },
  icon: {
    color: palette.blue,
    fontSize: 14,
  },
  iconDisabled: {
    color: palette.grayLight,
  },
  labelWrapper: {
    alignItems: 'center',
  },
  labelText: {
    color: palette.orange,
    marginBottom: 20,
  },
  controlWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    color: palette.blue,
  },
  placeholderDisabled: {
    color: palette.grayLight,
  },
});

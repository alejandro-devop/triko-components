export default ({palette}) => ({
  root: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    // marginBottom: 10,
  },
  radioCircle: {
    marginRight: 5,
    borderRadius: 100,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: palette.blue,
  },
  radioCircleAlternative: {
    borderColor: '#FFF',
  },
  radioCircleDisabled: {
    borderColor: palette.grayLight,
  },
  icon: {
    color: palette.blue,
    fontSize: 16,
  },
  iconAlternative: {
    color: '#FFF',
  },
  iconDisabled: {
    color: palette.grayLight,
  },
  labelWrapper: {
    alignItems: 'center',
    marginRight: 10,
  },
  labelText: {
    color: palette.orange,
    marginBottom: 10,
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
  horizontal: {
    flexDirection: 'row-reverse',
  },
  rootFromLeft: {
    flexDirection: 'row',
  },
  labelWrapperHorizontal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelTextHorizontal: {
    marginBottom: 0,
  },
  secondaryControl: {
    borderColor: palette.orange,
  },
  iconSecondary: {
    color: palette.orange,
  },
  circleFill: {
    backgroundColor: palette.blue,
  },
  circleFillSecondary: {
    backgroundColor: palette.orange,
  },
});

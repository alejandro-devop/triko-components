export default ({palette}) => ({
  root: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: 40,
  },
  icon: {
    fontSize: 50,
    color: palette.blue,
  },
  labelWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    color: palette.orange,
    fontSize: 22,
    fontWeight: '400',
  },
  guideWrapper: {
    position: 'absolute',
    zIndex: 1000,
    left: 0,
    top: '50%',
    transform: [{translateY: -20}],
  },
  buttonWrapper: {
    paddingHorizontal: 50,
  },
});

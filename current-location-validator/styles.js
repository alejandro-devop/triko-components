export default ({palette}) => ({
  icon: {
    fontSize: 140,
    position: 'absolute',
  },
  iconSecondary: {
    color: palette.red,
    fontSize: 200,
    opacity: 0.6,
  },
  iconWrapper: {
    backgroundColor: palette.grayLighter,
    borderRadius: 100,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: palette.blue,
    fontWeight: '600',
    textAlign: 'center',
  },
  textWrapper: {
    marginTop: 20,
  },
});

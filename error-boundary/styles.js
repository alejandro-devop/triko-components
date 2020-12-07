export default ({palette}) => ({
  root: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    paddingHorizontal: 20,
  },
  safe: {
    flex: 1,
  },
  icon: {
    fontSize: 80,
    position: 'absolute',
  },
  iconWrapper: {
    backgroundColor: palette.grayLighter,
    borderRadius: 100,
    marginTop: 20,
    width: 120,
    height: 120,
    alignSelf: 'center',
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

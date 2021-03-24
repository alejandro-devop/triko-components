export default ({palette}) => ({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  boxWrapper: {
    backgroundColor: palette.blueLight,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: palette.blueDark,
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  root: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.blueDark,
    flex: 1,
    textAlign: 'center',
  },
  textWrapper: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

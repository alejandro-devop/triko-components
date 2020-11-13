export default ({palette}) => ({
  contentWrapper: {
    backgroundColor: palette.blueLightAccent1,
    flex: 1,
    height: 260,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    top: -60,
    paddingHorizontal: 30,
    paddingTop: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFF',
  },
  contentWrapperEven: {
    backgroundColor: palette.blueLight,
  },
  contentWrapperPaid: {
    backgroundColor: palette.green,
    borderColor: palette.green,
  },
  root: {
    height: 220,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: palette.blueLightAccent1,
  },
  rootEven: {
    backgroundColor: palette.blueLight,
  },
  rootPaid: {
    backgroundColor: palette.green,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#fff',
  },
});

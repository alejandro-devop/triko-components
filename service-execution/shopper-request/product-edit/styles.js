export default ({palette}) => ({
  avatarIcon: {
    color: palette.blue,
    fontSize: 70,
    opacity: 0.5,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: palette.blueLightAccent1,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
  linkButton: {
    alignItems: 'center',
  },
  productText: {
    color: palette.blueDark,
  },
  productWrapper: {
    backgroundColor: palette.blueLightAccent1,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  root: {
    maxHeight: '90%',
    height: '90%',
  },
  row: {
    marginBottom: 20,
  },
});

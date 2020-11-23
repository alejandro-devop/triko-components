export default ({palette, variables: {textMedium}}) => ({
  actions: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  removeButton: {
    color: palette.blue,
  },
  root: {
    // backgroundColor: palette.blueLightAccent1,
    backgroundColor: 'rgba(0,0,0, 0.04)',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 40,
  },
  title: {
    color: palette.blue,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  toolText: {
    color: palette.blue,
    fontWeight: '600',
    flex: 1,
    fontSize: textMedium,
  },
  toolWrapper: {
    alignItems: 'center',
    backgroundColor: palette.blueLightAccent1,
    borderRadius: 40,
    marginBottom: 5,
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 10,
    paddingVertical: 2,
  },
});

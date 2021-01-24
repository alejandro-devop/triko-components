export default ({palette}) => ({
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 5,
  },
  actionWrapper: {
    marginLeft: 10,
  },
  contentWrapper: {
    backgroundColor: palette.blueLight,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
    minHeight: 100,
  },
  label: {
    fontSize: 12,
    marginTop: 10,
  },
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textContent: {
    fontSize: 16,
  },
});

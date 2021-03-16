export default ({palette}) => ({
  actions: {
    marginTop: 30,
    paddingHorizontal: 40,
  },
  caret: {
    backgroundColor: palette.gray,
    borderRadius: 100,
    width: 10,
    height: 10,
    marginRight: 10,
    marginTop: 5,
  },
  checkboxWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  descriptionContainer: {
    paddingHorizontal: 10,
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  featureText: {
    color: palette.black,
    fontSize: 15,
  },
  featureWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  featuresWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  noteInfo: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  noteInfoText: {
    fontSize: 15,
    textAlign: 'center',
  },
  root: {
    height: '75%',
    minHeight: 500,
    maxHeight: '95%',
  },
  wrapper: {
    flexGrow: 1,
    marginBottom: 50,
    backgroundColor: '#FFF',
  },
  wrapperWide: {
    paddingVertical: 40,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
});

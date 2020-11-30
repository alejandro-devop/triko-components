export default ({palette, variables: {textMedium}}) => ({
  content: {
    flex: 1,
  },
  distanceWrapper: {
    alignItems: 'center',
    borderColor: palette.blueLighter,
    borderWidth: 1,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    marginTop: 20,
  },
  distanceTextWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: palette.blue,
    borderRadius: 40,
  },
  root: {
    height: 500,
  },
  text: {
    fontSize: textMedium,
    fontWeight: '600',
  },
  textLabel: {
    color: palette.blue,
  },
  textDistance: {
    color: '#FFF',
  },
});

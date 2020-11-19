export default ({palette, variables: {textMedium}}) => ({
  actionWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },
  priceWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: palette.blueLightAccent1,
  },
  root: {paddingHorizontal: 20, paddingVertical: 10},
  text: {
    fontSize: textMedium,
  },
  textTotal: {
    flex: 1,
    fontWeight: '600',
    color: palette.blue,
  },
  textPrice: {
    fontWeight: '600',
    color: palette.blue,
  },
});

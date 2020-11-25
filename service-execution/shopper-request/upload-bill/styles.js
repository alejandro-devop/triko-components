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
  uploadedBill: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  uploadedWrapper: {
    width: '100%',
    maxHeight: 400,
  },
});

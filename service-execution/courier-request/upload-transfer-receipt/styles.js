export default ({palette, variables: {textMedium}}) => ({
  actionWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
  },
  priceWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: palette.blueLightAccent1,
  },
  qrImage: {
    width: '100%',
    height: '100%',
  },
  qrWrapper: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    width: 150,
    height: 150,
    padding: 10,
    marginTop: 20,
    marginBottom: 5,
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

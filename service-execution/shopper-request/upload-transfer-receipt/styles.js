export default ({palette, variables: {textMedium}}) => ({
  actionWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },
  bankInfoText: {
    fontSize: 14,
  },
  buttonRoot: {
    backgroundColor: palette.blue,
    padding: 0,
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  fullWrap: {
    paddingHorizontal: 20,
    width: '100%',
  },
  imageWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconStyles: {
    color: '#FFF',
  },
  infoWrap: {
    backgroundColor: palette.blueLightAccent1,
    flexDirection: 'row',
    borderRadius: 40,
    marginBottom: 5,
    alignItems: 'center',
  },
  infoWrapContent: {
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  infoWrapContentCopy: {
    paddingLeft: 20,
  },
  transferOptionTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: '600',
    color: palette.blue,
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
  textTitle: {
    color: palette.blue,
    fontWeight: '600',
    flex: 4,
  },
  textInfo: {
    flex: 6,
    textAlign: 'right',
  },
  textQr: {
    color: palette.blue,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: '600',
  },
});

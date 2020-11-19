export default ({palette, variables: {textMedium, textSmall}}) => ({
  priceText: {
    fontSize: textSmall,
    textAlign: 'right',
    fontWeight: '600',
    color: palette.blue,
  },
  priceWrapper: {
    width: 70,
    paddingRight: 10,
  },
  root: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: palette.blueLightAccent1,
    paddingLeft: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: palette.grayLight,
    marginBottom: 10,
  },
  text: {
    fontSize: textMedium,
    fontWeight: '600',
    color: palette.blue,
  },
  title: {
    flex: 1,
  },
});

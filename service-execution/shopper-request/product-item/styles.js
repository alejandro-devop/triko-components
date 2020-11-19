export default ({palette, variables: {textMedium, textSmall}}) => ({
  avatarIcon: {
    color: '#FFF',
  },
  avatarWrapper: {
    backgroundColor: palette.blue,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  icon: {
    color: palette.success,
    fontSize: 29,
    marginRight: 10,
    marginLeft: 10,
  },
  notFoundLine: {
    width: '100%',
    height: 2,
    left: 0,
    backgroundColor: palette.gray,
    position: 'absolute',
  },
  priceText: {
    fontSize: textSmall,
    textAlign: 'right',
    fontWeight: '600',
    color: palette.blue,
  },
  productNameText: {
    flex: 1,
    marginLeft: 10,
  },
  priceWrapper: {
    width: 70,
    paddingRight: 5,
  },
  root: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: palette.blueLightAccent1,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: palette.grayLight,
    marginBottom: 10,
  },
  rootAdded: {
    backgroundColor: palette.successLight,
    borderColor: palette.successDark,
  },
  rootNotFound: {
    opacity: 0.7,
  },
  text: {
    fontSize: textSmall,
  },
  textUnit: {
    marginRight: 15,
    color: palette.blueDark,
    fontWeight: '600',
  },
  textWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
});

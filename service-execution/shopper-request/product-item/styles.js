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
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  notFoundLine: {
    width: '80%',
    height: 2,
    right: '10%',
    backgroundColor: palette.gray,
    position: 'absolute',
    opacity: 0.6,
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
    borderWidth: 1,
    borderColor: palette.grayLight,
    height: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginBottom: 10,
  },
  rootAdded: {
    borderColor: palette.successDark,
  },
  rootNotFound: {
    opacity: 0.7,
  },
  text: {
    fontSize: textSmall,
  },
  textUnit: {
    marginRight: 10,
    color: palette.blueDark,
    fontWeight: '600',
  },
  textWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 2,
    borderColor: palette.grayLight,
    flex: 1,
    marginRight: 5,
  },
});

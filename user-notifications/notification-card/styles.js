export default ({palette, variables: {textExtraSmall, textXXS}}) => ({
  actionIcon: {
    color: palette.blue,
  },
  actionWrapper: {
    justifyContent: 'center',
  },
  icon: {
    color: '#FFF',
  },
  iconWrapper: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: palette.blue,
  },
  message: {
    fontSize: textXXS,
    marginTop: 10,
  },
  root: {
    backgroundColor: palette.blueLight,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: textExtraSmall,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    color: palette.blue,
    fontWeight: '600',
  },
});

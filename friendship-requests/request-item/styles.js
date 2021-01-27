const size = 45;
export default ({palette}) => ({
  avatar: {
    borderRadius: 100,
    width: size,
    height: size,
  },
  avatarWrapper: {
    marginRight: 10,
  },
  root: {
    alignItems: 'center',
    backgroundColor: palette.blueLight,
    borderRadius: 20,
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  rootSelected: {
    backgroundColor: palette.orangeLight,
  },
  textName: {
    color: palette.blueDark,
    fontSize: 12,
    fontWeight: '600',
  },
  textInvited: {
    fontSize: 10,
    color: palette.gray,
  },
  textWrapper: {
    flex: 1,
  },
});

const size = 25;
export default ({palette}) => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarWrapper: {
    width: size,
    height: size,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: palette.blueDark,
  },
  wrapper: {
    width: size / 1.5,
  },
  restText: {
    color: palette.gray,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 12,
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

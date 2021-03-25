const avatarSize = 50;

export default ({palette}) => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarWrapper: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: palette.blueLight,
  },
  name: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: palette.blue,
  },
  root: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: palette.grayLighter,
    borderRadius: 10,
    paddingVertical: 10,
  },
  serviceIcon: {
    width: '100%',
    height: '100%',
  },
  serviceIconWrapper: {
    width: avatarSize,
    marginLeft: 10,
    height: avatarSize,
    borderRadius: 100,
  },
  userInfoWrapper: {
    flexDirection: 'row',
  },
});

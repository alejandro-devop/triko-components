const avatarSize = 50;
export default ({palette}) => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: palette.grayLight,
  },
  avatarWrapper: {
    width: avatarSize,
    height: avatarSize,
  },
  content: {
    paddingHorizontal: 20,
  },
  serviceWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIcon: {
    width: '100%',
    height: '100%',
  },
  serviceIconWrapper: {
    backgroundColor: palette.blueLighter,
    marginLeft: 5,
    borderRadius: 100,
    width: 45,
    height: 45,
  },
  actionsWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  root: {},
  text: {fontSize: 14},
});

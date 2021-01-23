export default ({palette}) => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarWrapper: {
    width: 30,
    height: 30,
  },
  serviceWrapper: {
    marginTop: 20,
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

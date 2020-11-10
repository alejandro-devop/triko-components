export default ({palette}) => ({
  avatar: {
    width: 70,
    height: 70,
  },
  avatarWrapper: {
    marginRight: 10,
  },
  count: {
    borderRadius: 100,
    width: 20,
    height: 20,
    backgroundColor: palette.blueLight,
  },
  countWrapper: {
    flexDirection: 'row',
    flex: 1,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  loaderCard: {
    backgroundColor: palette.blueLightAccent,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    opacity: 0.6,
  },
  nameText: {
    // width: 200,
  },
  root: {},
  textWrapper: {
    flex: 9,
  },
  timeText: {
    width: 50,
  },
});

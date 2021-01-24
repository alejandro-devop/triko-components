export default ({palette}) => ({
  avatarWrapper: {},
  actions: {
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 5,
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: palette.blueLightAccent1,
    paddingBottom: 10,
    borderRadius: 40,
    marginBottom: 10,
  },
  text: {
    color: palette.gray,
    fontSize: 12,
  },
  textElapsed: {
    fontSize: 10,
  },
});

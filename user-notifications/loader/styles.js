export default ({palette}) => ({
  avatar: {
    width: 40,
    height: 40,
  },
  cardWrapper: {
    backgroundColor: palette.blueLightAccent,
    borderRadius: 20,
    flexDirection: 'row',
    marginBottom: 10,
    opacity: 0.6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  root: {
    paddingHorizontal: 20,
  },
  text: {
    height: 8,
  },
  textWrapper: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  time: {
    maxWidth: 60,
  },
  title: {
    maxWidth: 200,
  },
});

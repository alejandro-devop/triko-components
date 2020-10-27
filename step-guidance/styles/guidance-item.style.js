export default ({palette}) => ({
  root: {
    backgroundColor: palette.blue,
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  body: {
    flexDirection: 'row',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 1,
  },
  button: {
    backgroundColor: palette.orange,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  title: {
    fontWeight: '400',
  },
});

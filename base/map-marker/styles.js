export default ({palette}) => ({
  root: {
    width: 50,
    height: 50,
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  tip: {
    width: 8,
    height: 8,
    backgroundColor: palette.blue,
    borderRadius: 100,
    marginTop: 1,
  },
});

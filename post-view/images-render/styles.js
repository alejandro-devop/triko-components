export default ({palette}) => ({
  image: {
    width: '100%',
    height: '100%',
  },
  root: {
    height: 200,
    width: '100%',
    maxHeight: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: palette.blueDark,
    overflow: 'hidden',
    marginBottom: 5,
  },
});

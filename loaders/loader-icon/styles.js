export default ({palette = {}}) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  wave: {
    opacity: 0.5,
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: palette.orange,
    position: 'absolute',
  },
});

export default ({palette}) => ({
  icon: {
    color: '#FFF',
    fontSize: 25,
  },
  guide: {
    fontSize: 40,
  },
  guideWrapper: {
    width: 60,
    height: 60,
  },
  root: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 100,
    backgroundColor: palette.blue,
    transform: [{translateX: 10}],
  },
  arrowWrapper: {
    position: 'absolute',
    left: '100%',
    transform: [{translateX: 20}],
  },
  image: {
    width: 44,
    height: 44,
    backgroundColor: palette.blue1,
    borderRadius: 100,
  },
});

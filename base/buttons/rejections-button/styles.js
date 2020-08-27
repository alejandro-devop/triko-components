export default ({palette}) => ({
  root: {
    backgroundColor: '#FFF',
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  icon: {
    color: palette.red,
  },
  countWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{translateX: 15}, {translateY: 5}],
    backgroundColor: palette.red,
    minWidth: 30,
    minHeight: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  countText: {
    color: '#FFF',
  },
});

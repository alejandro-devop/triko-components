export default ({palette}) => ({
  root: {
    backgroundColor: '#Fff',
    width: '95%',
    height: '95%',
    flexDirection: 'column',
    borderRadius: 10,
  },
  iconWrapper: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  text: {
    color: palette.orange,
    fontSize: 14,
  },
  selectedIndicator: {
    position: 'absolute',
    right: 0,
  },
  selectedIcon: {
    color: palette.blue,
  },
});

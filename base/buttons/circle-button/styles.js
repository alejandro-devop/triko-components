export default ({palette, shadows}) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFF',
    ...shadows.shadow1,
    marginHorizontal: 5,
  },
  primary: {
    backgroundColor: palette.blue,
  },
  icon: {
    color: palette.blue,
  },
  iconPrimary: {
    color: '#FFF',
  },
  sm: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 60,
    height: 60,
  },
  xl: {
    width: 75,
    height: 75,
  },
  xs: {
    width: 30,
    height: 30,
  },
  xxs: {
    width: 30,
    height: 30,
  },
  iconXl: {
    fontSize: 30,
  },
  iconXxs: {
    fontSize: 14,
  },
  wrapper: {
    alignItems: 'center',
  },
  labelText: {
    color: palette.orange,
    fontSize: 16,
  },
  badgeWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: palette.red,
    paddingHorizontal: 10,
    zIndex: 100,
    borderRadius: 30,
    transform: [{translateX: 10}, {translateY: -5}],
  },
  badgeText: {
    color: '#FFF',
  },
  disabled: {
    opacity: 0.3,
  },
});

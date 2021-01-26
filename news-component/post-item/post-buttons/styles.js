export default ({palette}) => ({
  badge: {
    backgroundColor: palette.blue,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    minWidth: 20,
    right: 0,
    transform: [{translateX: 12}, {translateY: -5}],
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
  },
  button: {
    marginRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: palette.blue,
  },
  iconAlt: {
    color: '#FFF',
  },
  root: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 60,
  },
});

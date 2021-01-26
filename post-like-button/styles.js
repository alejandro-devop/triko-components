export default ({palette}) => ({
  altButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  badgeWrapper: {
    backgroundColor: palette.blue,
    position: 'absolute',
    minWidth: 20,
    borderRadius: 20,
    alignItems: 'center',
    zIndex: 100,
    top: 0,
    right: 0,
    transform: [{translateX: 5}, {translateY: -5}],
  },
  icon: {
    color: palette.blue,
  },
  iconLiked: {
    color: '#FFF',
  },
  label: {
    fontSize: 12,
    marginTop: 10,
  },
  root: {
    marginRight: 10,
  },
  rootLiked: {
    backgroundColor: palette.blue,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

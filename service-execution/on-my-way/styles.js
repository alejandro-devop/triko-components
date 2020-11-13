export default ({palette}) => ({
  root: {
    backgroundColor: palette.blue1,
    zIndex: -1,
    width: '100%',
  },
  mapViewWrapper: {
    minHeight: 120,
    maxHeight: 220,
  },
  mapView: {
    height: '100%',
    width: '100%',
  },
  infoWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  actionsWrapper: {
    backgroundColor: '#FFF',
    paddingVertical: 20,
    alignItems: 'center',
  },
  actionButton: {
    width: 80,
    height: 80,
  },
  actionButtonIcon: {
    fontSize: 40,
  },
});
